const PageNotFound = () => {
    return(
        <div style={{display: "flex",justifyContent: "center", marginTop: "90px"}}>
        <div style={{display: "flex", flexDirection: "column", textAlign: "center", color: "#34375d"}}>
        <h1>Страница не найдена.</h1>
        <button onClick={() => window.location.href = '/'} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#34375d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            На главную
        </button>
        </div>
        </div>
    );
}

export default PageNotFound;