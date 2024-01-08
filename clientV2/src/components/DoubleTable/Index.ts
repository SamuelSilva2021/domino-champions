import { Pair } from "@/utils/models/pair"
interface Props{
    setSelectedDouble: React.Dispatch<React.SetStateAction<Pair | undefined>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    double: Pair
}
export const handleDelete = (double: Pair) => {
    
}
export const handleEdit = ({setSelectedDouble, double, setEdit}: Props) => {
    setSelectedDouble(double)
    setEdit(true)
}