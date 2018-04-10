# 前端上传Excel 文件，本组件将二进制数据转化为json对象

>Required : [js-xlsx](https://github.com/SheetJS/js-xlsx)

``` Bash

npm i xlsx

```

-----

>How To Use (In `Vue.js`  Single Comp)

``` JavaScript
// 1. import this component
import UploadExcelComponent from '@/components/UploadExcel/index'

// 2. use the comp
export default {
    ...
    components: { UploadExcelComponent },
    ...
    methods: {
        ...
        onSelectedFile (data) {
            console.table(data.results)
      }
    }
}

```

```HTML

<!-- In template -->
<upload-excel-component @on-selected-file="onSelectedFile"></upload-excel-component>

```

>Param:

@event on-selected-file

-----

## Contact Me

Mail(ellipse120@gmail.com)