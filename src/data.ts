export interface value{
    name : string,
    position : {x:number,y:number},
    velocity : {x:number, y :number}
    mass: number,
    radius : number,
    restiution : number
   }

   export const  values = [
    {
        name : "football",
        position : {x:0,y:0},
        velocity : {x:0,y:0},
        mass : 0.4,
        radius : 25,
        restitution:-.65,
        rotation:5,
    },
    {
        name : "basketball",
        position : {x:0,y:0},
        velocity : {x:0,y:0},
        mass : 1,
        radius : 30,
        restitution:-.8,
        rotation:5,
    },
    {
        name : "baseball",
        position : {x:0,y:0},
        velocity : {x:0,y:0},
        mass : .142,
        radius : 15,
        restitution:-.5,
        rotation:5,
    },{
        name : "tennis",
  position : {x:0,y:0},
  velocity : {x:0,y:0},
  mass : 0.3,
  radius : 14,
  restitution:-.7,
  rotation:5,
}
   ];