import ShowRecipe from './components/ShowRecipe';

function App() {
  return (
    <>
    <div className="background"> 
    
         <h1 className="title">Receptboken</h1>   
        <div className="container">
        <button>Sök recept</button>
        <button>Laga med det jag har</button>
        <button>Skapa nytt recept</button>
        
    </div>
    <ShowRecipe />
</div>
</>
  );
}

export default App;
