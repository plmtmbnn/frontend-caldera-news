import react, { useState } from 'react';

import { Button } from 'antd';

import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


function WritingTipsModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const informationList = [
        'Berita yang baru dibuat, mohon untuk klik "Simpan Sebagai Draft"',
        'Gambar tambahan mohon upload terlebih dahulu (kalo ada)',
        'Berita yang punya gambar tambahan, utamakan konten berita terlebih dahulu, terakhir sisipkan gambar tambahan dan deskripsi',
        'Untuk deskripsi gambar tambahan, font: Helvetica & size 12px',
        'Untuk "baca juga" berupa link, ketik terlebih dahulu captionya, lalu sisipkan link lalu terakhir ubah heading menjadi "Quote"'
    ]
    return (
      <>
        <Button type="dashed" onClick={handleShow}>
          Tips menulis*
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tips menulis berita pada dashboard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup>
            {
                informationList.map((e, i) => {
                    return(<ListGroup.Item key={i}>{`${i+1}. ${e}`}</ListGroup.Item>)
                })
            }
        </ListGroup>
          </Modal.Body>
        </Modal>
      </>
    );
}

export default WritingTipsModal;