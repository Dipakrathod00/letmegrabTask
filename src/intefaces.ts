export interface tableItem {
    title: string
    price:number
    description: string
    category:string;
    setisEdit?:()=>void;
    isEdit:boolean
}
export interface tableItems {
    id:number | string
    title: string
    price:number
    description: string
    category:string;
}