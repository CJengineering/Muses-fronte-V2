import { ModalProvider } from 'src/context/KeywordContext'
import TableKeyword from 'src/views/table/data-grid/TableKeyword'

const Keywords = () => {
  return (
    <>
      <ModalProvider>
        <TableKeyword />
      </ModalProvider>
      ,
    </>
  )
}
export default Keywords
