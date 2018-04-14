from boa.interop.Neo.Blockchain import GetHeight
from boa.interop.Neo.Runtime import CheckWitness, Notify, Serialize, Deserialize, Log
from boa.interop.Neo.Action import RegisterAction
from boa.interop.Neo.Storage import *
from boa.builtins import concat

OnBooking = RegisterAction('booking', 'space_id', 'date', 'guest_address')
OnBookingCancel = RegisterAction('booking_cancel', 'space_id', 'date', 'return_percent')

ctx = GetContext()

NSE_OWNER = b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'
KEY_SPACE_IDS = 'space_ids'
KEY_SPACE_SEQ = 'space_seq'
KEY_BOOKING_SEQ = 'booking_seq'
CANCEL_RANK_WEEK = 604800
CANCEL_RANK_3_DAYS = 259200
CANCEL_RANK_1_DAYS = 72000

def Main(operation, args): # object Array

    if operation == 'get_space_ids':
        return get_space_ids(ctx)

    elif operation == 'get_space':
        # space id
        return get_space(ctx, args[0])

    elif operation == 'create_space':
        # owner_address, name, desc
        return create_space(ctx, args[0], args[1], args[2])
    
    elif operation == 'create_booking':
        # space_id, guest_address, date, start_at):
        return create_booking(ctx, args[0], args[1], args[2], args[3])


def get_space_ids(ctx):
    ids = Get(ctx, KEY_SPACE_IDS)

    if ids:
        return Deserialize(ids)
    else:
        return []


def get_space(ctx, space_id):
    space = Get(ctx, concat('space-', space_id))

    if space:
        deserialized = Deserialize(space)

        # _owner, name, desc, status
        return [deserialized[1], deserialized[2]]
    else:
        return []


def create_space(ctx, owner, name, desc):
    if not CheckWitness(owner):
        return False

    space = [owner, name, desc]
    space_id = _generate_space_id

    Put(ctx, concat('space-', space_id), Serialize(space))

    _save_space_ids(space_id)

    return True


def create_booking(ctx, space_id, guest_address, date, start_at):
    if not CheckWitness(guest_address):
        return False

    # space_id, guest_address, date
    bookinged_id = _build_booking_id(space_id, date)

    bookinged = Get(ctx, bookinged_id)
    if bookinged: 
        return False

    Put(ctx, bookinged_id, Serialize([guest_address, start_at, False, False]))
    OnBooking(space_id, date, guest_address)

    return True


def cancel_bookinng(ctx, space_id, guest_address, date):
    if not CheckWitness(guest_address):
        return False

    booking_id = _build_booking_id(space_id, date)
    serialized_booking = Get(ctx, booking_id)
    if not serialized_booking:
        return False
    
    booking = Deserialize(serialized_booking)

    # guest_address, start_at, approved, canceled
    start_at = booking[1]
    canceled = booking[3]

    height = GetHeight()

    if height > start_at:
        return False

    if canceled:
        return False

    booking[3] = True
    Put(ctx, booking_id, Serialize(booking))

    return_percent = _caluclate_return_percent(start_at, height)
    OnBookingCancel(space_id, date, return_percent)

    return return_percent


def _generate_space_id():
    current_id = Get(ctx, KEY_SPACE_SEQ)

    if current_id:
        next_id = current_id + 1
    else:
        next_id = 1

    Put(ctx, KEY_SPACE_SEQ, next_id)

    return next_id

def _save_space_ids(new_id):
    ids = Get(ctx, KEY_SPACE_IDS)

    if ids:
        deserialized = Deserialize(ids)
        deserialized.append(new_id)

        Put(ctx, KEY_SPACE_IDS, Serialize(deserialized))
    else:
        Put(ctx, KEY_SPACE_IDS, Serialize([new_id]))


def _build_booking_id(space_id, date):
    return concat(concat(concat('spaces-', space_id), '-'), date)


def _caluclate_return_percent(start_at, height):
    peroid = start_at - height

    if peroid > CANCEL_RANK_WEEK:
        return 100
    elif peroid > CANCEL_RANK_3_DAYS:
        return 70
    elif peroid > CANCEL_RANK_1_DAYS:
        return 30
    else:
        return 0
