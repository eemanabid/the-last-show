# add your create-obituary function here

import json
import requests
import boto3

def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": json.dumps({
            "version": 3,
            "ip": get_public_ip()
        })
    }

def get_public_ip():
    res = requests.get("https://checkip.amazonaws.com")
    return res.text