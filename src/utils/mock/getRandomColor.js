export const getRandomColor= ()=>{

  let R=new Math.round(Math.random()*255)
  let G=new Math.round(Math.random()*255)
  let B=new Math.round(Math.random()*255)
  return {R,G,B}
}