const userTypes=['buy','rent']

const propertyTypes=["Apartment","House","Condo","Land"]

const petAllowance=["Allowed","Not allowed"]

const utilitiesPolicy=["Renter is responsible","Owner is responsible"]

const depositPolicy=["Must deposit 2X of the rent to owner","Must deposit 3X of the rent to owner","Must deposit 4X of the rent to owner","Must deposit 5X of the rent to owner"]

const buyMarkerUrl="https://cdn3.iconfinder.com/data/icons/home-62/48/Sale-Home-Property-Smart-512.png"

const rentMarkerUrl="https://cdn-icons-png.flaticon.com/512/6231/6231224.png"

const registerUserInputFields=[
{name:"username",type:"text",id:"username",labelText:"username",placeholder:"Enter your username"},
{name:"email",type:"email",id:"email",labelText:"email",placeholder:"Enter your email"},
{name:"password",type:"password",id:"password",labelText:"password",placeholder:"Enter your password"}]

const loginUserInputFields=[
{name:"username",type:"text",id:"username",labelText:"username",placeholder:"Enter your username"},
{name:"password",type:"password",id:"password",labelText:"password",placeholder:"Enter your password"}]

const updateProfileInputFields=[
 {name:"username",type:"text",id:"username",labelText:"username"},
 {name:"email",type:"email",id:"email",labelText:"email"}
]

const addPostInputFields=[
    {name:"title",type:"text",id:"title",labelText:"Title"},
    {name:"price",type:"number",id:"price",labelText:"Price"},
    {name:"bedroom",type:"number",id:"bedroom",labelText:"Bedroom Number"},
    {name:"bathroom",type:"number",id:"bathroom",labelText:"Bathroom Number"},
    {name:"size",type:"number",id:"size",labelText:"Total Size(sqft)"},
    {name:"school",type:"number",id:"school",labelText:"School close by"},
    {name:"bus",type:"number",id:"bus",labelText:"Bus Stop close by"},
    {name:"restraunt",type:"number",id:"restraunt",labelText:"Restraunt close by"}
]

const addPostInitialValues={
    title:"",
    price:null,
    type:"",
    property:"",
    size:null,
    bedroom:null,
    bathroom:null,
    desc:"",
    images:[]
}

const noImageAvailableUrl="https://www.its.ac.id/tmesin/wp-content/uploads/sites/22/2022/07/no-image.png"

export {userTypes,propertyTypes,buyMarkerUrl,rentMarkerUrl,registerUserInputFields,loginUserInputFields,updateProfileInputFields,addPostInputFields,addPostInitialValues,noImageAvailableUrl,petAllowance,utilitiesPolicy,depositPolicy}