
const Header = (props) => {
  return (
      <h1 className=" text-xl">{props.name} </h1>
  )
}

const Content = (props) => {
  const part = props.parts.map( (part) => <p key={part.id}>  {part.name} {part.exercises}</p>)
  return(
    <div >
      {part}
    </div>
  )
}

  const Total = (props) => {
  const total = props.parts.reduce((sum, current) => sum + current.exercises, 0)
  console.log(total)
  return (
    <p>total of {total} exercises </p>
  )
}

    const Course = (props) => {
      console.log(props)
      return (
        <div>
          <Header name={props.course.name} />
          <Content parts={props.course.parts}/>
          <Total parts={props.course.parts}/>
        </div>
      )
    }

    export default Course;


