import React, {useState} from 'react';
import './Cards.css';
import CardItem from './CardItem';
import CardItem2 from './CardItem2';

function CurationCards({title, data}) {
  const [sample, setSample] = useState({
    user:'kim',
    id:2,
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: '큐레이션 샘플',
    content:'큐레이션 설명이 들어가는 곳',
    private: false,
  })
  let remain=[]

  const rendering = () =>{
    let result=[];
    let render=[];
    for (let i=0; i<data.length; i++){
      if (i%3===2){
        result.push(data[i])
        console.log('첫번째 데이터', result[0])
        console.log('두번째 데이터', result[1])
        console.log('세번쨰 데이터', result[2])

        render.push(
          <ul className='cards__items'>
          <CardItem2
                curation={result[0]}
          />
          <CardItem2
                curation={result[1]}
          />
          <CardItem2
                curation={result[2]}
          />
        </ul>
        )
        result=[];
      }
      else{
        result.push(data[i])
      }
    }

    result.map((data)=>{
      remain.push(data)
    })
    return render;
  }
  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {data && rendering()}
          <ul className='cards__items'>
            {!remain? <></>:
            ( 
              remain.map(curation=>(
                <CardItem2
                curation={curation}
              />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CurationCards;
