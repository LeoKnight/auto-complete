import React,{useState, ChangeEvent} from 'react';
import { Observable,BehaviorSubject, timer, Subject } from 'rxjs'
import { filter, scan, startWith, tap, map, switchMap, withLatestFrom, publishReplay, refCount, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useEventCallback } from "rxjs-hooks";
import ItemList from "./components/ItemList";
import './App.css';
import { mockHttpPost, HttpResponse } from './utils';

function App() {
  const [value, setValue] = useState('');
  const [itemList, setItemList] = useState<string[]>([]);
  const inputSubject$ = new Subject<string>();
  const clickSubject$ = new Subject<boolean>();

  const click$= clickSubject$
  .pipe(
    tap(()=>{
      // console.log('11111')
      setItemList([...itemList,value])
    }),
    tap(()=>{
      setValue('')
    })
  ).subscribe();

  const input$ = inputSubject$
  .pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(e=>console.log('beforHttp',e)),
    switchMap(mockHttpPost),
    tap(e=>console.log('afterHttp',e)),
    tap((e:HttpResponse)=>setItemList(e.data.map(e=>e))),
  )
  .subscribe(x => console.log(x,'=======')); 

  const hancleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    // setValue(e.target.value)
    inputSubject$.next(e.target.value)
    // const debounced = debounce(console.log,500)
    // debounced('aaa')

  }


  const handleClick =()=>{
    clickSubject$.next(true)
  }
  // const [onEvent, frame] = useEventCallback(events$ => {
  //   const on$ = events$.pipe(
  //     filter(e => e.type === "click"),
  //   );

  //   return events$.pipe(
  //     filter(e => e.type === "change"),
  //     tap(e=>console.log(e.target.value))
  //   )
  //   ;
  // })

  // console.log(frame)
  return (
    <div className="App">
      demo
      <input 
        type="text"
        // value={value}
        onChange={hancleChange}
      />
      <button
        onClick={handleClick}
      >btn</button>
      <p>Current value: {value}</p>
      <div className="">
        <ItemList data={itemList}/>
      </div>
    </div>
  );
}

export default App;
