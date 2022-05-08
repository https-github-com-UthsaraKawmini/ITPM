import React, { Component } from 'react'
import { getPurchaseHistoryByUserService } from '../../../services/purchase-history-service';
import { Container} from '@material-ui/core';
import MaterialTable from "material-table";

class PurchaseHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasedItems: [],
        }
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("user"));
        getPurchaseHistoryByUserService(user._id).then(res => {
            if (res.status) {
                this.setState({
                    purchasedItems: res.purchaseHistory ? res.purchaseHistory.purchasedItems : [],
                });
            }
        })
    }

    render() {
        return (
            <Container style={{ marginTop: 50 }}>
                <MaterialTable
                    title="Purchase History"
                    columns={[
                        {
                            title: 'Image',
                            field: 'imageURL',
                            render: rowData => (
                                <img
                                    style={{ height: "45px", width: "45px", borderRadius: '45%' }}
                                    src={rowData.imageURL}
                                />
                            ),
                            export: false
                        },
                        { title: "Name", field: "name" },
                        { title: "Price", field: "price" },
                        { title: "Quantity", field: "quantity" },

                    ]}
                    data={this.state.purchasedItems.map(o => ({ ...o }))}
                    options={{
                        exportButton: true,
                        search: false,
                    }}
                />
            </Container>
        );
    }
}

export default PurchaseHistory;