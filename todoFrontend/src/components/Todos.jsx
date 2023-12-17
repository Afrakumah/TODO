import PropTypes from 'prop-types';
import Styles from "./todo.module.css";


export default function Todo(props) {
  //console.log("props from todos----", props);
  return (
      // <>
      <div className={Styles.chore} style= {props.todo.completed ?
      {textDecoration: "line-through"} : {backgroundColor: "gray"}}>
        <p>{props.todo.chore} </p>

        <div className= {Styles.btns}>
        <div>
          <button className={Styles.compbtn} onClick={() => props.handleUpdate(props.todo._id)}>
            
            {props.todo.completed ? 'completed' : 'pending'}

            </button>
             </div>
            <div> 
          <button className={Styles.delbtn} onClick={() => props.handleDelete(props.todo._id)}>delete</button>
          </div>
        </div>

       
      </div>
    //  </>
  );
}

 Todo.propTypes = {
todo: PropTypes.shape({ 
chore: PropTypes.string.isRequired,
_id: PropTypes.string,
completed: PropTypes.bool

 }),
 
 handleDelete: PropTypes.func,
 handleUpdate: PropTypes.func,
 }