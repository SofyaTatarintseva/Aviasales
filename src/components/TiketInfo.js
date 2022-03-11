
import React from 'react';
import moment from 'moment';

function TrackInfo(props) {
    let stops = props.segments.stops
    let travelHour = Math.trunc((props.segments.duration/60))
    let travelMinutes = (props.segments.duration - Math.trunc((props.segments.duration/60))*60)
    let date = moment.utc(props.segments.date);
    let dateEnd = new Date(date.year(), date.month(), date.date(), (date.hour() + travelHour), (date.minute() + travelMinutes))
    let timeArrival = `${date.format("HH:mm")} - ${moment(dateEnd).format("HH:mm")}  `
    let text = props.segments.stops.length === 0 ? 'Без пересадок' : `${props.segments.stops.length} пересадк${props.segments.stops.length === 1? 'а' : 'и'}`

    return (
      <div className="tiket-card_content">
        <div className="tiket-card_content_row" >
            <div className='tiket-card_content_header'>{props.segments.origin} - {props.segments.destination}</div>
            <div className='tiket-card_content_info'>{timeArrival}</div>
        </div>
        <div className="tiket-card_content_row" >
            <div className='tiket-card_content_header'>В пути</div>
            <div className='tiket-card_content_info'>{travelHour}ч {travelMinutes}м</div>
        </div>
        <div className="tiket-card_content_row" >
            <div className='tiket-card_content_header'>{text}</div>
            <div className='tiket-card_content_info'>{stops.join(',')}</div>
        </div>
      </div>
    );
  }

function CardTiket(props) {

    return (
        <div className="tiket-card">
            <div className='tiket-card_header'> 
                <div className='tiket-card_header_price'>{props.value.price.toLocaleString()} P</div>
                <div>
                    <img src={`https://pics.avs.io/99/36/${props.value.carrier}.png`} alt='logo'/>
                </div>
            </div>
            <TrackInfo segments={props.value.segments[0]}/>
            <TrackInfo segments={props.value.segments[1]}/>
        </div>
      );
}


class TiketInfo extends React.Component {
    render() {
        const ticketsAll = this.props.tikets.length > 0 ? this.props.tikets.map((el, index) => 
            <CardTiket key={index} value={el}/>
        ) :  <div>Нет данных</div>
        return (
            <div>
            {ticketsAll}
            </div>
        
        );
    }
}
export default TiketInfo;