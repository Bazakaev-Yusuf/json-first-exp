import { useEffect, useState } from "react"


function App(){

   const [data, setData] = useState([]);
   const [load, setLoad] = useState(true);
   const arr = data.filter(item => item.completed === true);
   const arr2 = data.filter(item => item.completed === false);

   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
      return response.json()
      })
      .then((json) => {
         setData(json.filter((item, index) => index < 15))
         setLoad(false)
      })
   }, [])

   const completed = (id) => {
      setData(data.map(item => item.id === id ? {...item, completed: !item.completed} : {...item}))
   }

   const allChange = () => {
      setData(data.map(item => {
         return {...item, completed: true}
      }))
   }
   const allChange2 = () => {
      setData(data.map(item => {
         return {...item, completed: false}
      }))
   }
   
   
   return(
      <div className="containet">
         {load ? 
            <div className="load"></div> :  
            <div>
               <h2>Общее количество задач: {data.length}</h2>
               <h4>Выполнено : {arr.length}</h4>
               <h4>Не выполнено : {arr2.length}</h4>
         <div className="btn-block">
            <button className="btn btn-success" onClick={allChange}>All Completed</button>
            <button className="btn btn-danger" onClick={allChange2}>All Uncompleted</button>
         </div>
         <ul className="ul list-group">
         {data.map(item => {
            return(
               <li key = {item.id} className={item.completed ? 'list-group-item bg-green' : "list-group-item bg-red"}>
                  <input type="checkbox" checked={item.completed} onChange={() => completed(item.id)} className='checkbox'/>
                  {item.title}
               </li>
            )
         })}
         </ul>
            </div>
         }
      </div>
   )
}
export default App;