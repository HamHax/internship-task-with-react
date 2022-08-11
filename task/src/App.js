import { useRef, useState } from 'react';
import './App.css';
import Wrapper from './Ui/Wrapper/Wrapper';
import Card from '../src/Ui/Card/Card'
import classes from '../src/Ui/Global.module.css'
import Button from '../src/Components/Button/Button'
import Input from '../src/Components/Input/Input'
import List from '../src/Components/List/List'
import Listitem from '../src/Components/ListItem/Listitem'
import Text from '../src/Components/Text/Text'
import { IoClose } from "react-icons/io5"

const App  = () => {
    const [toDoList, setToDoList] = useState([
      {text: `Researching, designing, implementing software programs.`, id: 1, done: false},
      {text: `Testing and evaluating new programs`, id: 2, done: false},
      {text: `Identifying areas for modification in existing programs.`, id: 3, done: false},
      {text: `Writing and implementing efficient code.`, id: 4, done: false},
      {text: `Identifying areas for modification  in existing programs `, id: 5, done: false},
      {text: `Writing  and implementing  efficient code`, id: 6, done: false},
      {text: `Researching,designing,implementing software programs`, id: 7, done: false},

    ]);
    const [nextId, setNextId] = useState(toDoList[toDoList.length - 1]?.id + 1);
    const [notComplited, setNotComplited] = useState(false);
    const taskRef = useRef("");
    const [inputClass, setInputClass] = useState(`${classes.searchInput}`);
    const [inputPlaceholder, setInputPlaceholder] = useState('Write here');
    const [deleteMainDivClass, setDeleteMainDivClass] = useState(`${classes.main}`);
    const [deleteDivClass, setDeleteDivClass] = useState(`${classes.mainChild}`);
    const [deletedId, setDeletedId] = useState(``)






    const filterTasks = (el) => {
      if(notComplited) {
          return el.done === false
      } else {
        return true
      }
    }






    return(
      <Wrapper>
        <Card className={deleteDivClass}>
              <Text> Are you sure you want to delete? </Text>
              <Card>
                <Button className={classes.finallyDelete} >Yes</Button>
                <Button className={classes.finallyDelete} >No</Button>
              </Card>
        </Card>
        <Card className={deleteMainDivClass}> 
        
        </Card>
         <Card className={classes.hide}>
          <Input  className={classes.checkbox} type="checkbox" />
          <Text className={classes.hidetext}>Hide complited</Text>
        </Card>
        <Card className={classes.addInput}>
        <Input placeholder={inputPlaceholder} type="text" className={inputClass} myRef={taskRef} />
        <Button  className={classes.addButton}>Add</Button>
        </Card>
        
        <List className={classes.list}>
            {toDoList.filter(el => filterTasks(el)).map(el => {
              return(
              <Card className={classes.conteiner}>
              <Listitem className={classes.myListitem } key={el.id}>
                <Input defaultChecked={el.done}  className={classes.listitemInput} type="checkbox" />
                 {el.text} <IoClose  className={classes.deleteItems} />
              </Listitem>
              </Card>
              )
            })}
        </List>
      </Wrapper>
    )
}


export default App;
