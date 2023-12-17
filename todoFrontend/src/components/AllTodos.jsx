import PropTypes from 'prop-types';
import Todo from "./Todos";

export default function alltodos(props) {
  //console.log("props from todos----", props);
  return (
     <>
      
        {props.alltodos.map((todo) => (
          <Todo todo={todo} key={todo._id} handleDelete={props.handleDelete} handleUpdate={props.handleUpdate} />
        ))}
     
    </>
  );

}

alltodos.propTypes = {
alltodos: PropTypes.array,
handleDelete: PropTypes.func,
handleUpdate: PropTypes.func,

}
