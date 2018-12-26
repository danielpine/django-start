# _*_ coding:utf-8 _*_
import copy
import json
import os
import re
import sys
import time
import uuid


def load_json_file():
    basedir = os.path.abspath(os.path.dirname(__file__))
    lang_arr = ['en', 'zh']
    res = {}
    for lang in lang_arr:
        with open(os.path.join(basedir, lang + '.json'), 'r', encoding='UTF-8') as f:
            res[lang] = json.loads(f.read())
    return res


def get_paths(dict_source):
    element = dict_source
    rmap = {}
    s_dict = {}
    process_element(element, [], rmap)
    keys = list(rmap.keys())
    keys.sort()
    print(json.dumps([rmap[k] for k in keys], indent=4,
                     sort_keys=False, ensure_ascii=False))


def process_element(element,  last_paths, rmap):
    for child in element:
        ele = element[child]
        if isinstance(ele, (dict)):
            this_paths = copy.deepcopy(last_paths)
            this_paths.append(child)
            process_element(ele, this_paths, rmap)
        else:
            arr = re.split('\.',  '.'.join(last_paths)+'.'+child, 1)
            path = arr[1]
            lang = arr[0]
            if path not in rmap:
                rmap[path] = {'path': path}
            rmap[path][lang] = ele


file_json = load_json_file()

get_paths(file_json)
