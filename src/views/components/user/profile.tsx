import React from "react";
import { Card } from "../../components/common/card";
import { Core } from "../../../core/index";
import { APIGet } from "../../../config/api";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../config/route";

interface Props{
    core: Core
}
interface State {
    name: string
}

export class Profile extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            name: ''
        }
    }
    async componentDidMount() {
        const data = await this.props.core.db.get('/user', undefined) as APIGet['/user']['res']
        this.setState({
            name: data[0]['username']
        })
        this.props.core.user.setName(data[0]['username'])
    }
    public render() {
        return <div>
            <Card>
                <p>用户名:{this.state.name}</p>
            </Card>
            <Card>
                <Link to={{pathname: ROUTE.travels,state:{own: true}}} >我的路线</Link>
            </Card>
            <Card style={{textAlign: 'center'}}>
                <button className="button is-danger" onClick={() => {
                    this.props.core.user.logout();
                }}>log out
                </button>
            </Card>
            
            </div>
    }
}