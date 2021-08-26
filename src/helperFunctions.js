  //FUNCTION TO SHOW CANCEL BUTTON TO DISABLE INPUT FIELD AND BUTTON TO CLEAR THE INPUT FIELD
export  const showCloseInput = () => {
    setInputActivity(true)
  }
//FUNCTION TO HIDE CANCEL BUTTON TO DISABLE INPUT FIELD AND BUTTON TO CLEAR THE INPUT FIELD
export  const removeCloseInput = () => {
    setInputActivity(false)
    
  }
//FUNCTION FOR BUTTON TO CLEAR INPUT VALUE IN <TEXT_INPUT> AND SET NEW SEARCH REQUEST
export  const RemoveInputValue = () => {
    setInputValue("")
    setSearchRequest("")
  }