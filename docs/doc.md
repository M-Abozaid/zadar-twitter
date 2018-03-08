

## Modules

A Module is an action that is taken by the bot it could be a plain text message an image,
multiple choice question or await meaning ignore user message 

Each campaign will have an array of these modules specifying the conversation flow 

### modules have the following structure 
```javascript
{   
    // the modId field
    "modId": 2, // required  must be unique 
    // this field will reference the module it will make it easy for me to extract the next module for the code
    // it should be in 0,2,3... sequence (starting form 0)

    // question name 
    "questionName":"liking the product" // not required and can have any value
    // this field will include a custom name for the question to include with the user's answers

    // the type field
    "type":"multiple_choice", // required
    // this field will be one of the following 
    // multiple_choice: for sending multiple choice questions
    // text_msg: for just sending a plain text message there will be no validation for the user response to this module
    // text_question: the same as the text_msg except the user response will be saved in the answers
    // email: ask for user's email
    // mobile_number: ask for user's mobile number
    // county: ask for user's country
    // city: ask for user's city
    // birth_year: ask for user's birth year
    // address_1: ask for user's address line 1
    // address_2: ask for user's address line 2
    // feedback: ask for the user's feedback about the product
    // post_permission: ask for post permission 
    // post_review: ask the user to review the post before publishing
    // image: send and image 
    // video: send a video
    // await: ignore the user's future message until  resume conversation api is called 
    // carousel: send a carousel 
    // pin_code: ask for pin code and the results will be saved in the users document
    // address_preview: preview address and pin-code 

    "text": "did you like the product", // required for all module types except await

    // Choices field required for the multiple_choice module type
    // can be included with image, video, and carousel
    "choices":[{
        "text":"Yes", // required.  this is the text of the choice 
        "nextModule":5 // not required. if this field is specified we will move to module 5 if the user answers "Yes"
    },{
        "text":"No",
    }]
    // the choices field will be an array of fields for as long as 10 choices

    "nextModule":4 // Not required 
    // this field specifies the next module to send after this one 
    // if not specified will go to the next module in the list (modId +1) in this  case 3
    // The priority will be as follows 
    //1- nextModule in the answered choice if specified in this case 5
    //2- the nextModule field
    //3- the next module on the list (modId + 1)

    "immediatelyGoToNextModule": false, // required (default false)
    // if set to true then we will move to the next specified module 

    "errorResponse": "Please choose Yes or No",// required for modules that need validation
    // this will be a validation message in case the user's answer was invalid 

    "imageURL":"https://myimageurl.com/img.png",// required for image type modules

    "videoURL":"https://myvideourl.com/video",// required for video type modules

    "required": true, // required (default true) if set to false answer validation will be skipped and will move to the next module 

    "carouselElements":[{
        "imageURL":"",
        "title":"",
        "subtitle":"",
        "buttons":[{
            "text":"", // the title of the button 
            "nextModule":0, // either a url or nextModule can be specified 
            "url":"" // a url for the webview
        }]
    }]
    

}
```
```json
{
    "name": "Awesome campaign 3",
    "active": true,
    "welcomeMessage": "Hello! let me introduce you to our third awesome product.",
    "banner": "http://stories.barkpost.com/wp-content/uploads/2013/05/sleepingpuppy3-600x446.jpg",
    "adId": "1234",
    "companyName": "Sleepy monster",
    "modules": [
        {
            "modId": 0,
            "type": "text_msg",
            "moduleName": "greeting msg",
            "text": "Hey!",
            "immediatelyGoToNextModule": true,
            "required": true,
            "choices": [],
            "_id": "5a94702761ee8476d1e7c326"
        },
        {
            "modId": 1,
            "type": "multiple_choice",
            "moduleName": "are you familiar with product",
            "text": "Are you familiar with product X",
            "immediatelyGoToNextModule": false,
            "choices": [
                {
                    "text": "Yes",
                    "nextModule": 3,
                    "_id": "5a94702761ee8476d1e7c324"
                },
                {
                    "text": "No",
                    "_id": "5a94702761ee8476d1e7c323"
                },
                {
                    "text": "maybe",
                    "_id": "5a94702761ee8476d1e7c322"
                }
            ],
            "errorResponse": "Please choose Yes or No",
            "required": true,
            "_id": "5a94702761ee8476d1e7c325"
        },
        {
            "modId": 2,
            "type": "email",
            "moduleName": "email",
            "text": "Please type your Email address.",
            "errorResponse": "This Doesn't seem like a valid Email",
            "nextModule": 4,
            "required": true,
            "choices": [],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c321"
        },
        {
            "modId": 3,
            "type": "image",
            "moduleName": "will be skipped  ",
            "text": "What do you think?",
            "imageURL": "http://stories.barkpost.com/wp-content/uploads/2013/05/sleepingpuppy3-600x446.jpg",
            "required": false,
            "choices": [],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c320"
        },
        {
            "modId": 4,
            "type": "image",
            "moduleName": "cute ",
            "text": "What do you think?",
            "imageURL": "http://stories.barkpost.com/wp-content/uploads/2013/05/sleepingpuppy3-600x446.jpg",
            "required": false,
            "choices": [
                {
                    "text": "cute ",
                    "_id": "5a94702761ee8476d1e7c31e"
                }
            ],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c31f"
        },
        {
            "modId": 5,
            "type": "text_msg",
            "moduleName": "finish mission",
            "text": "Thank you, you should receive your shipment within a week",
            "immediatelyGoToNextModule": true,
            "required": true,
            "choices": [],
            "_id": "5a94702761ee8476d1e7c31d"
        },
        {
            "modId": 6,
            "type": "multiple_choice",
            "moduleName": "are you familiar with product",
            "text": "Are you familiar with product Y",
            "immediatelyGoToNextModule": false,
            "choices": [
                {
                    "text": "Yes",
                    "nextModule": 3,
                    "_id": "5a94702761ee8476d1e7c31b"
                },
                {
                    "text": "No",
                    "_id": "5a94702761ee8476d1e7c31a"
                },
                {
                    "text": "maybe",
                    "_id": "5a94702761ee8476d1e7c319"
                }
            ],
            "errorResponse": "Please choose Yes or No",
            "required": true,
            "_id": "5a94702761ee8476d1e7c31c"
        },
        {
            "modId": 7,
            "type": "feedback",
            "moduleName": "feedback",
            "text": "please give a feedback of at least 20 words",
            "errorResponse": "The feedback must at least 20 words long",
            "required": true,
            "choices": [],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c318"
        },
        {
            "modId": 8,
            "type": "address",
            "moduleName": "address",
            "text": "Please type your address.",
            "required": true,
            "choices": [],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c317"
        },
        {
            "modId": 9,
            "type": "text_msg",
            "moduleName": "finish mission2",
            "text": "Thanks bye",
            "required": true,
            "choices": [],
            "immediatelyGoToNextModule": false,
            "_id": "5a94702761ee8476d1e7c316"
        }
    ],
    "referralRef": "test",
    "_id": "5a94702761ee8476d1e7c327",
    "createdAt": "2018-02-26T20:37:59.706Z",
    "updatedAt": "2018-02-26T20:37:59.706Z",
    "__v": 0
}
```