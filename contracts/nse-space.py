from boa.interop.Neo.Runtime import CheckWitness, Notify, Serialize, Deserialize, Log
from boa.interop.Neo.Action import RegisterAction
from boa.interop.Neo.Storage import *
from boa.builtins import concat

OnBooking = RegisterAction('booking', 'space_id', 'date', 'guest_address')

ctx = GetContext()

NSE_OWNER = b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'
KEY_SPACE_IDS = 'space_ids'
KEY_SPACE_SEQ = 'space_seq'
KEY_BOOKING_SEQ = 'booking_seq'

def Main(operation, args): # object Array

    if operation == 'get_space_ids':
        return get_space_ids(ctx)

    elif operation == 'get_space':
        # space id
        return get_space(ctx, args[0])

    elif operation == 'create_space':
        # owner_address, name, desc
        # TODO: image url ?
        return create_space(ctx, args[0], args[1], args[2])
    
    elif operation == 'create_booking':
        # space_id, guest_address, date
        return create_booking(ctx, args[0], args[1], args[2])


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
    Notify('create space start.')
    Log('create space start.')

    if CheckWitness(NSE_OWNER):
        Notify('CheckWitness True')
        Log('CheckWitness True')

        # TODO: check owner is valid address
        space = [owner, name, desc, 'created']
        current_id = Get(ctx, KEY_SPACE_SEQ)

        if current_id:
            next_id = current_id + 1
        else:
            next_id = 1

        Put(ctx, concat('space-', next_id), Serialize(space))

        Put(ctx, KEY_SPACE_SEQ, concat(next_id, ''))
        ids = Get(ctx, KEY_SPACE_IDS)
        if ids:
            Put(ctx, KEY_SPACE_IDS, Serialize(ids))
            return ['Added']
        else:
            Put(ctx, KEY_SPACE_IDS, Serialize([next_id]))
            return ['Initialized']
    else:
        return []


def create_booking(ctx, space_id, guest_address, date):
    # space_id, guest_address, date

    bookinged_id = concat(concat(concat('spaces-', space_id), '-'), date)
    bookinged = Get(ctx, bookinged)
    if bookabled:
        return [False]
    else:
        Put(ctx, bookinged_id, Serialize([guest_address, False])) # guest_address, approved
        OnBooking(space_id, date, guest_address)

        return [True]
