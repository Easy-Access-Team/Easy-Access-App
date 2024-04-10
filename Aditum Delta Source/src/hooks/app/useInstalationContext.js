import { useContext } from "react";
import { InstalationContext } from "../../context/instalation";

const useInstalationContex = () => {
    const instContext = useContext(InstalationContext);
    return instContext
}

export default useInstalationContex;