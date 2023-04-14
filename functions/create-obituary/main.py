# add your create-obituary function here

import json
import requests
import boto3

#client = boto3.client('ssm')

#response = client.get_parameters_by_path(
 #   Path='/the-last-show/',
  #  Recursive=True,
   # WithDecryption=True
#)

#response = {key["Name"]: key["Value"] for key in response["Parameters"]}

#def get_keys(key_path):
 #   return response[key_path]

#def lambda_handler(event, context):
 #   return {
  #      "statusCode": 200,
   #     "body": json.dumps({
    #        "version": 3,
     #       "ip": get_public_ip()
      #  })
    #}

#def get_public_ip():
 #   res = requests.get("https://checkip.amazonaws.com")
  #  return res.text

#def test_get_keys():
 #   key = get_keys("/the-last-show/cloudinary-key")
  #  print(key)
   # assert len(key) > 0

import requests
from requests_toolbelt.multipart import decoder
import boto3
import base64
import os

def lambda_handler(event, context):
	body = event("body")

	if event("isBase64Encoded"):
		body = base64.b64ecode(body)

	content_type = event["headers"]["content-type"]
	#decode body of request
	data = decoder.MultipartDecoder(body, content_type)

	binary_data = [part.content for part in data.parts]
	name = binary_data[1].decode() #string not in binary anymore, prints Ada Lovelace
	born = binary_data[2].decode() #string not in binary anymore, prints 1872
	print(name, type[name])
	print(born, type[born])

	#store binary in new file, in our assignment, we must put in cloudinary not s3
	# you only have access to the /tmp folder in lambda
	key = "obituary.png"
	file_name = os.path.join("/tmp", key)
	with open("obituary.png", "wb") as f:
		f.write(binary_data[0])
