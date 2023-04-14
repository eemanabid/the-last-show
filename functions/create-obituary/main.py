# add your create-obituary function here

import requests
from requests_toolbelt.multipart import decoder
import boto3
import base64
import os
import time
import hashlib

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("the-last-show-30142625")

def lambda_handler(event, context):
    body = event["body"]
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    #image = binary_data[1].decode()
    name = binary_data[1].decode()
    bornDate = binary_data[2].decode()
    diedDate = binary_data[3].decode()
    print(name, type[name])
    print(bornDate, type[bornDate])

    key = "obituary.png"
    file_name = os.path.join("/tmp", key)
    with open(file_name, "wb") as f:
        f.write(binary_data[0])

    res = upload_to_cloudinary(file_name)

    item = {
        'name': name,
        'bornDate': bornDate,
        'diedDate': diedDate,
    }
    table.put_item(Item=item)
    return {"statusCode": 200, 
            "body": "Success"}
    
def upload_to_cloudinary(filename, resource_type = "image", extra_fields=()):
    api_key = get_keys("/the-last-show/cloudinary-key")
    cloud_name = "xmanox"
    api_secret = get_keys("/the-last-show/cloudinary-secret-key")

    body = {
        "api_key": api_key
    }

    files = {
        "file": open(filename, "rb")
    }

    timestamp = int(time.time())
    body["timestamp"] = timestamp
    body.update(extra_fields)
    body["signature"] = create_signature(body, api_secret)

    url = f"http://api.cloudinary.com/v1_1/{cloud_name}/{resource_type}/upload".format(cloud_name)
    res = requests.post(url, files=files, data=body)
    return res.json()

def create_signature(body, api_secret):
    exclude = ["api_key", "resource_type", "cloud_name"]
    sorted_body = sort_dictionary(body, exclude)
    query_string = create_query_string(sorted_body)
    query_string_appended = f"{query_string}{api_secret}"
    hashed = hashlib.sha1(query_string_appended.encode())
    signature = hashed.hexdigest()
    return signature

def sort_dictionary(dictionary, exclude):
    return {k: v for k, v in sorted(dictionary.items(), key=lambda item: item[0]) if k not in exclude}

def create_query_string(body):
    query_string = ""
    for idx, (k, v) in enumerate(body.items()):
        query_string = f"{k}={v}" if idx == 0 else f"{query_string}&{k}={v}"

    return query_string

client = boto3.client("ssm")

response = client.get_parameters_by_path(
    Path='/the-last-show/',
    Recursive=True,
    WithDecryption=True
)

response = {key["Name"]: key["Value"] for key in response["Parameters"]}

def get_keys(key_path):
    return response[key_path]

#def get_public_ip():
 #   res = requests.get("https://checkip.amazonaws.com")
  #  return res.text
