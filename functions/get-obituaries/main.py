import boto3
import json
from boto3.dynamodb.conditions import Key

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('the-last-show-30142625')

def lambda_handler(event, context):
    uuid = event["headers"]["uuid"]
    try:
        response = table.query(
            KeyConditionExpression=Key("uuid").eq(uuid),
        )
        items = response['Items']
        
        if (len(items) != 0):
                sorted_items = sorted(items, key=lambda x: x["creation"])
                return sorted_items
        else:
            return []
    except Exception as exp:
        print(f"exception: {exp}")
        return {
            "statusCode": 401,
                "body": json.dumps({
                    "message": str(exp)
            })
        }