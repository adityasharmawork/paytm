
export default function InputBox({label, placeholder}) {
  return (
    <div>
        <div className="">
            {label}
        </div>
        <input placeholder={placeholder} />
    </div>
  )
}
