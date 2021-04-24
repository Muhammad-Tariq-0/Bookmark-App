
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import './index.css'
export default function Home() {
    const [loading, setloading] = useState(false);
    const [deleting, setdeleting] = useState(false);
    const [updating, setupdating] = useState(false);

    //---------------Getting Data------------------------------

    const [mydata, setData] = useState([]);
    useEffect(() => {
        console.log("useEffect Called");
        fetch(`/.netlify/functions/readall`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log("Data: " + JSON.stringify(data));
            });
    }, [loading, deleting, updating]);

    //--------------Delete Data-------------------------

    async function DeleteBookmark(e) {
        console.log("delete funtion Called successfully");
        console.log(e.ref["@ref"].id);
        Swal.fire({
            title: 'Are you sure?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
      
                setdeleting(true);
                 fetch(`/.netlify/functions/delete`, {
                    method: 'post',
                    body: JSON.stringify({ id: e.ref["@ref"].id })
                })
                setdeleting(false);
            }
              })
            
    }


    //--------------------Add Student------------------------------------------
    function AddBookmark() {
        console.log("Add funtion Called successfully");
        Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2']
        }).queue([
            {
                title: 'Title',
                text: 'Enter Title',
                inputAttributes: {
                    maxlength: "25"
                  }
                 },
            {
                title: 'LINK',
                text: 'Add Link here',
                input: 'url',
            },
        ]).then((result: any) => {
            if (result.value) {
                console.log(result.value[0])
                Swal.fire({
                    title: 'All done!',
                    confirmButtonText: 'ok!'
                })
                SendData(result.value);
            }
        })

        async function SendData(receive) {
            console.log(receive);
            setloading(true);
            await fetch(`/.netlify/functions/create`, {
                method: 'post',
                body: JSON.stringify({ title: receive[0], link: receive[1] })
            })
            setloading(false);
        }

    }


    return <div>

<div className="app">
            <div>
            <label>
                <h1 className="heading"> Bookmark APP </h1>
            </label>
            <button onClick={AddBookmark} className="addButton">Add Bookmark</button>
            </div>
            
            <div id="todos">
            {mydata.map((e,num)=>{
                  const id = e.ref["@ref"].id;
                return(
                    <ul key={num} className="todo">
                        <li className='li'>{e.data.title}</li>
                       <li className='li'>
                           <a className="goButton" href={e.data.link} target="_blank">Go</a> &nbsp;
                           <button onClick={() => { DeleteBookmark(e) }} className="deleteButton">delete</button> &nbsp;
                            </li>
                    </ul>
                )
            })}
            
            </div>

        </div>


    </div>
}

