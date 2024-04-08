import { BaseBtn } from "../../../styled/index"
import Icon from "../Icon/Index"
const Btn = ({action,colors, type, icon, onClick, disabled, popovertarget, id}) => {
    return <BaseBtn popovertarget={popovertarget} id={id} disabled={disabled} onClick={onClick} className={`${colors} ${type}`}>{action} {icon && <Icon icon={icon}/>}</BaseBtn>
}
export default Btn