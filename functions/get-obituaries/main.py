import boto3
import json

dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table('the-last-show-30142625')

def lambda_handler(event, context):
    try:
        response = table.scan()
        items = response['Items']
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response['Items'])
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