# -*- coding: utf-8 -*-
class Bullet():
    """子弹类"""

    def __init__(self, x, y, direct, speed, tankid, bulletid):
        self.x = x
        self.y = y
        self.direct = direct
        self.speed = speed
        self.tankid = tankid
        self.bulletid = bulletid
        self.is_live = True

    def run(self):
        # print('running···')
        if self.x < 0 or self.x > 1366 or self.y < 0 or self.y > 768:
            return True
        else:
            if self.direct == 0:
                self.y -= self.speed
            if self.direct == 1:
                self.x += self.speed
            if self.direct == 2:
                self.y += self.speed
            if self.direct == 3:
                self.x -= self.speed
            # print(self.x, self.y)
            return False
