import React, { Component } from 'react'

import './sass/Disclaimer.scss'

import { Modal } from 'antd'

class Disclaimer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  // a function to return the լավաշ text
  flatbread () {
    return (
      <>
        <p>
          Կայքում առկա նյութերը բացառապես ճանաչողական դիտման և ընթերցման համար են նախատեսված։
        </p>
        <p>
          Դրանց տեղակայումը կայքում շահույթ հետապնդելու նպատակ չի կրում։
        </p>
        <p>
          Ավելին՝ կայքը որևէ շահույթ չի ստեղծում, և կայքի բովանդակային ներդրումներն արվում են բացառապես կամավոր հիմունքներով։
        </p>
        <p>
          Օրիգինալ ֆայլերը (մանգաների սքաները՝ անգլերեն կամ ռուսերեն թարգմանությամբ, և անիմեներին վիդեորները) հավաքվել են ազատ մուտք ունեցող արտասահմանյան կայքերից։
        </p>
        <p>
          Դրանց նկատմամբ հեղինակային իրավունքը և հարակից իրավունքները պատկանում են համապատասխան իրավատերերին, դրանք օգտագործելն անհրաժեշտ է համաձայնեցնել համապատասխան իրավատերերի հետ։
        </p>
        <p>
          Կայքը պատասխանատվություն չի կրում դրանց օգտագործման հետևանքով առաջացած հնարավոր վնասի համար։
        </p>
        <p>
          Եթե հանդիսանում եք կայքում առկա որևէ նյութի հեղինակային իրավունքների իրավատերը և ցանկանում եք հեռացնել այն կայքից, <a href='mailto: high_otaku@yahoo.com'>գրեք մեզ</a>:
        </p>
        <p>
          Թարգմանության օգտագործումն ազատ է։ Ցանկալի է նշել թարգմանիչների անուններն ու գործող հղում տալ կայքին։
        </p>

      </>
    )
  }

  render () {
    return (
      <div className='disclaimer'>
        <Modal
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          maskClosable keyboard
          footer={null}
        >
          {this.flatbread()}
        </Modal>
        կայքում առկա նյութերը բացառապես ճանաչողական դիտման և ընթերցման համար են նախատեսված։
        <span onClick={() => this.setState({ visible: true })} className='clickable highlight'> ավելին․․․ </span>
      </div>
    )
  }
}

export default Disclaimer
