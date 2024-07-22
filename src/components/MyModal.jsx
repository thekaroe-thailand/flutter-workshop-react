function MyModal(props) {
  return (
    <>
      <div
        class="modal fade"
        id={props.id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {props.title}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id={props.id + "_btnClose"}
              ></button>
            </div>
            <div class="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyModal;
