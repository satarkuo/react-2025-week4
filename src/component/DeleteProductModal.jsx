import { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap';
import { Toast } from '../utils/sweetAlert';
import axios from 'axios';
import PropTypes from 'prop-types'; 


import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.scss'

const { VITE_BASE_URL: baseURL, VITE_API_PATH: apiPath } = import.meta.env;

function DeleteProductModal({
        tempModalData,
        getProductsList,
        setTempModalData,
        defaultData,
        isOpen,
        setIsOpen
    }){

    const deleteProductModalRef = useRef(null);
    useEffect(() => {
        new Modal(deleteProductModalRef.current, {
            backdrop: 'static',
            keyboard: false,
        }); //建立modal

        // 在模態框關閉時，清理焦點
        deleteProductModalRef.current.addEventListener('hidden.bs.modal', () => {
            const title = document.querySelector('.modal-title');
            if (title) {
                title.focus();
            }
        });
    
    }, [])

    useEffect(() => {
        if(isOpen) {
            const modalInstance = Modal.getInstance(deleteProductModalRef.current) //取得modal
            modalInstance.show();

            // 將焦點設置到模態框內的第一個可聚焦元素
            setTimeout(() => {
                const title = document.querySelector('.modal-title');
                if (title) {
                    title.focus();
                }
            }, 150)
        }
    },[isOpen])

    //刪除產品
    const deleteProduct = async () => {
        try {
        await axios.delete(`${baseURL}/api/${apiPath}/admin/product/${tempModalData.id}`)
        } catch (error) {
        Toast.fire({
            icon: "error",
            title: "刪除產品失敗",
            text: error.response.data.message
        });
        }
    }
  
    // modal送出確認：刪除產品
    const handleDeleteProduct = async () => {
        try {
        await deleteProduct();
        getProductsList();
        closeDeleteProductModal();
        } catch (error) {
        Toast.fire({
            icon: "error",
            title: "刪除產品失敗",
            text: error.response.data.message
        });
        }
    }

    //關閉modal：刪除產品
    const closeDeleteProductModal = () => {
        const modalInstance = Modal.getInstance(deleteProductModalRef.current) //取得modal
        modalInstance.hide();
        setIsOpen(false);
        setTempModalData(defaultData); //清空產品資料，避免影響下一步動作
        // 移除模態框焦點並將焦點設置到其他地方
        const triggerButton = document.querySelector('.btn'); // 修改為觸發模態框的按鈕選擇器
        if (triggerButton) {
            triggerButton.focus(); // 將焦點移到觸發按鈕
        }
    }

    return (
        <div className="modal fade" tabIndex="-1" ref={deleteProductModalRef} id="delProductModal">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" tabIndex="0">刪除產品</h5>
                        <button type="button" className="btn-close" onClick={closeDeleteProductModal}></button>
                    </div>
                    <div className="modal-body">
                        是否刪除產品 <span className="text-danger fw-bold">{tempModalData.title}</span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-delete" onClick={handleDeleteProduct}>刪除</button>
                        <button type="button" className="btn btn-secondary" onClick={closeDeleteProductModal}>取消</button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default DeleteProductModal;
DeleteProductModal.propTypes = {
    tempModalData: PropTypes.object.isRequired,
    getProductsList: PropTypes.func.isRequired,
    setTempModalData: PropTypes.func.isRequired,
    defaultData: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}