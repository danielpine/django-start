# -*-coding:utf-8 -*-
import json
from django.http import HttpResponse
from rec.models import Test


# 数据库操作
def testdb(request):
    test1 = Test(name='runoob')
    test1.save()
    result = {"status": "1", "data": "添加成功", 'msg': '添加成功', "city": "北京"}
    #json返回为中文
    return HttpResponse(
        json.dumps(result, ensure_ascii=False),
        content_type='application/json',
        charset='utf-8')
