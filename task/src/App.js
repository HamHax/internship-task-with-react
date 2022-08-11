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
    const [searchInput, setSearchInput] = useState(`${classes.searchInput}`);
    const [placeholder, setPlaceholder] = useState('Write here');
    const [main, setMain] = useState(`${classes.main}`);
    const [mainChildren, setMainChildren] = useState(`${classes.mainChild}`);
    const [deletedId, setDeletedId] = useState(``)



    const filterTasks = (el) => {
      if(notComplited) {
          return el.done = false
      } else {
        return true
      }
    }


    const addTask = () => {
        if(taskRef.current.value) {
          const object = {
            text: taskRef.current.value,
            id: nextId,
            done: false
          }
          setToDoList(toDoList.concat(object));
          setNextId(nextId + 1)
          taskRef.current.value = ``
          setSearchInput(`${classes.searchInput}`)
          setPlaceholder('Write here')
        } else {
          setSearchInput(`${classes.emptyInput}`)
          setPlaceholder('Fill the  task')
        }
    }


    const deleteTask = (id) => {
      setMain(`${classes.main} ${classes.mainBlock}`);
      setMainChildren(`${classes.mainChild} ${classes.mainChildSecond}`)
      setDeletedId(id)
    }

    const deleteYes = () => {
            const filteredList = toDoList.filter(el => el.id !== deletedId);
            setToDoList(filteredList)
            setDeletedId(``);
            setMain(`${classes.main}`);
            setMainChildren(`${classes.mainChild}`)
    }

    const deleteNo = () => {
        setDeletedId(``);
        setMain(`${classes.main}`)
        setMainChildren(`${classes.mainChild}`)
    }

    const doneTask = (id) => {
      let modifiedList = [...toDoList];
      modifiedList.map(el => el.id === id ? el.done = !el.done : null);
      setToDoList(modifiedList)
    }

    return(
      <Wrapper>
        <Card className={mainChildren}>
              <Text> Are you sure you want to delete? </Text>
              <Card>
                <Button className={classes.finallyDelete} onClick={deleteYes}>Yes</Button>
                <Button className={classes.finallyDelete} onClick={deleteNo}>No</Button>
              </Card>
        </Card>
        <Card className={main}></Card>
         <Card className={classes.hide}>
          <Input onClick={() => setNotComplited(!notComplited)} className={classes.checkbox} type="checkbox" />
          <Text className={classes.hidetext}>Hide complited</Text>
        </Card>
        <Card className={classes.addInput}>
        <Input placeholder={placeholder} type="text" className={searchInput} myRef={taskRef} />
        <Button onClick={addTask} className={classes.addButton}>Add</Button>
        </Card>
        
        <List className={classes.list}>
            {toDoList.filter(el => filterTasks(el)).map(el => {
              return(
              <Card className={classes.conteiner}>
              <Listitem className={classes.myListitem } key={el.id}>
                <Input defaultChecked={el.done} onClick={() => doneTask(el.id)} className={classes.listitemInput} type="checkbox" />
                 {el.text} <IoClose onClick={() => deleteTask(el.id)} className={classes.deleteItems} />
              </Listitem>
              </Card>
              )
            })}
        </List>
      </Wrapper>
    )
}


export default App;
