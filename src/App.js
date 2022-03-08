import React from 'react';
import Async from 'react-async';
import './App.css';

const cargarJson = () =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

function App() {
  return (
    <Async promiseFn={cargarJson}>
      <Async.Fulfilled>
        {data => {
          return (
            <div class="container-fluid">
              <div class="row">
                <div class="col text-center mt-3">
                  <div>
                    <h2>Posts</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col" id="grid">
                  {data.map(post => (
                    <div key={post.id} className="row" class="card" id={"card" + post.id}>
                      <div class="card-body">
                        <div class="card-title">
                          <h5>{post.title}</h5>
                        </div>
                        <div class="card-text">
                          <p>
                            Usuario: {post.userId}
                          </p>
                          <p>
                            {post.body}
                          </p>
                        </div>
                        <div>
                          <button type="button" class="btn btn-danger" onClick={() => document.getElementById('card' + post.id)?.remove()}>
                            <i class="bi-x-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }}
      </Async.Fulfilled>
      <Async.Rejected>
        {error => `Los posts no pudieron ser cargados: ${error.message}`}
      </Async.Rejected>
    </Async>
  );
}

export default App;