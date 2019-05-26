import React, { Component } from 'react';

class Machine extends Component {

    static defaultProps = {
        name : '알 수 없음',
    }

    state = {
        goods : ['음료1','음료2','음료3','음료4','음료5'
                ,'과자1','과자2','과자3','과자4','과자5'
                ,'과일1','과일2','과일3','과일4','과일5'],
        pay : [1000,2000,1500,1000,500
            ,1000,2000,1500,1000,500
            ,1000,2000,1500,1000,500],
        cashList : [10,50,100,500,1000],
        cash : 0,
        putCash : 0,
        cashReturn : 0,
        message : "자판기를 이용해 주셔서 감사합니다.",
        cmpGoods : [],
    }

    handleInsert = () => {
        this.setState({
            cash : Number(this.state.cash) + Number(this.state.putCash)
        })
        
    }

    handleCashChange = (e) => {
        this.setState({
            putCash : e.target.value
        })
    }

    handleReturn = () => {
        this.setState({
            cashReturn : this.state.cashReturn + this.state.cash,
            cash : 0    
        })
    }

    handleTake = () => {
        this.setState({
            cashReturn : 0
        })
    }
    
    handleGoodsPush = (e) => {
        console.log( this.state.cash > this.state.pay[e]);
        if ( this.state.cash >= this.state.pay[e] ){
            this.setState({
                cash : this.state.cash - this.state.pay[e],
                cmpGoods : this.state.cmpGoods.concat(this.state.goods[e]),
            })

        }else{

        }
    }
 
    handleRemove = (index) => {
        const {cmpGoods} = this.state;

        this.setState({
            cmpGoods : [
                ...cmpGoods.slice(0,index),
                ...cmpGoods.slice(index+1,index.length),
            ]
        })
    }

    render() {

        const goodsList1 = this.state.goods.slice(0,5).map(
            (goods,index) => (<td key={index}>{goods}&nbsp;</td>)
        )
        const goodsList2 = this.state.goods.slice(5,10).map(
            (goods,index) => (<td key={index}>{goods}&nbsp;</td>)
        )
        const goodsList3 = this.state.goods.slice(10,15).map(
            (goods,index) => (<td key={index}>{goods}&nbsp;</td>)
        )
        const payList1 = this.state.pay.slice(0,5).map(
            (pay,index) => (<td key={index}><button value={pay} onClick={()=>this.handleGoodsPush(index)}>{pay}</button>&nbsp;</td>)
        )
        const payList2 = this.state.pay.slice(5,10).map(
            (pay,index) => (<td key={index}><button value={pay} onClick={()=>this.handleGoodsPush(index+5)}>{pay}</button>&nbsp;</td>)
        )
        const payList3 = this.state.pay.slice(10,15).map(
            (pay,index) => (<td key={index}><button value={pay} onClick={()=>this.handleGoodsPush(index+10)}>{pay}</button>&nbsp;</td>)
        )
        const cashList = this.state.cashList.map(
            (cash,index) => (<option value={cash} key={index}>{cash}원</option>)
        )
        const cmpGoods = this.state.cmpGoods.map(
            (cmpGoods,index) => (<button className="button" key={index} onClick={() => this.handleRemove(index)}>{cmpGoods}</button>)
        )
        return (
            <div>
                {this.props.name}의 자판기<br /><br />
                <table>
                    <tbody>
                        <tr>
                            {goodsList1}
                        </tr>
                        <tr>
                            {payList1}
                        </tr>
                        <tr>
                            {goodsList2}
                        </tr>
                        <tr>
                            {payList2}
                        </tr>
                        <tr>
                            {goodsList3}
                        </tr>
                        <tr>
                            {payList3}
                        </tr>
                    </tbody>
                </table>
                <hr />
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                {this.state.message}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>현재 투입금액 : {this.state.cash}원</td>
                        </tr>
                        <tr>
                           <td>
                                <select onChange={this.handleCashChange}>
                                    <option >현금</option>
                                    {cashList}
                                </select>
                            </td>
                            <td>
                                <button onClick={this.handleInsert}>투입</button>
                            </td>
                            <td>
                                <button onClick={this.handleReturn}>반환</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                잔돈 : <button onClick={this.handleTake}>{this.state.cashReturn}원</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                나온상품 {cmpGoods}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Machine;