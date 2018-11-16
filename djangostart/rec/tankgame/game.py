# from tank import Tank
# from room import Room
# from settings import Settings
# import uuid
# import json
# import threading
# import time
# import random

# tank_settings = Settings()

# rooms = {}
# rooms[0] = Room()
# user = {"id": 1, "roomid": 0, 'tank': Tank(1, 140, 140, 0, tank_settings)}
# rooms[0].adduser(user)
# rooms[0].user_battling(user)

# for i in range(10):
#     #time.sleep(random.randint(0, 3))
#     user['tank'].direct = random.randint(0, 3)
#     user['tank'].shot()
# rooms[0].fun_timer()