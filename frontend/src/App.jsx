
function App() {

  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Router>
      </BrowserRouter>
    </>
  )
}

export default App
