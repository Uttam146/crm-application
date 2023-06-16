import React from "react";
import Swal from "sweetalert2";

export function SwalAuth(icon,title,time,position){
    const Toast = Swal.mixin({
        toast: true,
        position:position,
        showConfirmButton: false,
        timer: time,
        width:'400px',
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: icon,
        title: title
      })
}