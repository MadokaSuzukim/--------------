// <<<<<<< HEAD
// =======
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-item');
    const saveBtn = document.getElementById('save-reflection');
    const reflection = document.getElementById('reflection');
    let morningRoutine;

    function loadMorningRoutine() {
        const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
        items.forEach(itemText => {
            addRoutineItem(itemText, false);
        });
    }

    morningRoutine = document.getElementById('morning-routine');

    function addRoutineItem(itemText, save = true) {
        const li = document.createElement('li');
        li.textContent = itemText;
        morningRoutine.appendChild(li);
        if (save) {
            const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
            items.push(itemText);
            localStorage.setItem('morningRoutine', JSON.stringify(items));
        }
    }

    loadMorningRoutine();

    saveBtn.addEventListener('click', () => {
        const today = new Date().toLocaleDateString('ja-JP');
        const reflectionText = reflection.value;
        saveDailyReflection(today, reflectionText);
        alert('振り返りを保存しました');
    });

    $("main").slideDown(500);

    $("#save").on("click", function(){
        const v = $("#textarea").val();
        localStorage.setItem("memo", v);
        alert("保存しました");
    });

    $("#clear").on("click", function(){
        localStorage.removeItem("memo");
        $("#textarea").val("");
        alert("削除しました");
    });

    if(localStorage.getItem("memo")){
        const v = localStorage.getItem("memo");
        $("#textarea").val(v);
    }
    
    checkAndShowWelcomeBackMessage();

    const body = document.body;
    const hour = new Date().getHours();
        
    if (hour >= 6 && hour < 18) {
        body.classList.add('morning');
    } else {
        body.classList.add('night');
    }

    const quote = getRandomQuote();
    alert(quote);

    var timeLeft = 3 * 60;
    var timerElement = document.getElementById('timer');

    var timerId = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert('3分が経過しました。自分の時間を楽しんでください！');
        } else {
            timeLeft -= 1;
        }
    }, 1000);

    document.getElementById('addRoutineBtn').addEventListener('click', function() {
        const newRoutine = document.getElementById('newRoutineInput').value;
        if (newRoutine) {
            addNewRoutine(newRoutine);
            document.getElementById('newRoutineInput').value = '';
        }
    });

    document.querySelectorAll('.routine-item button').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentNode;
            item.parentNode.removeChild(item);
        });
    });

    let isEditMode = false;

    function saveOrEditData() {
        if (isEditMode) {
            console.log('編集内容を保存');
        } else {
            console.log('新規内容を保存');
        }
        isEditMode = !isEditMode;
    }

    function enterEditMode() {
        isEditMode = true;
    }

    function updateMascotState() {
        const mascotImage = document.getElementById('mascotImage');
        const states = ['img/1.png', 'img/2.png', 'img/3.png','img/4.png','img/5.png','img/6.png','img/7.png'];
        let currentState = states.indexOf(mascotImage.src.split('/').pop());

        currentState = (currentState + 1) % states.length;
        mascotImage.src = states[currentState];
    }

    let progress = 0;
    const totalItems = 4;
    let currentStage = 0;

    function updateProgress() {
        progress++;
        if (progress >= totalItems) {
            currentStage++;
            updateMascotState();
            showCongratulationModal();
        }
    }

    function showCongratulationModal() {
        document.getElementById('congratulationModal').style.display = 'block';
    }

    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('congratulationModal').style.display = 'none';
    });

    function updateMascotState() {
    }

    const actionButton = document.getElementById('action-btn');
    let mode = 'edit';

    actionButton.addEventListener('click', function() {
        switch(mode) {
            case 'edit':
                console.log('編集モードです');
                mode = 'save';
                actionButton.textContent = '保存';
                break;
            case 'save':
                console.log('保存モードです');
                mode = 'delete';
                actionButton.textContent = '削除';
                break;
            case 'delete':
                const confirmDelete = confirm('本当に削除しますか？');
                if (confirmDelete) {
                    console.log('削除処理');
                }
                mode = 'edit';
                actionButton.textContent = '編集';
                break;
            default:
                console.log('不明なモードです');
                break;
        }
    });

    document.getElementById('loadDataButton').addEventListener('click', function() {
        var myData = localStorage.getItem('myData');
        if (myData) {
            document.getElementById('dataDisplay').textContent = myData;
        } else {
            document.getElementById('dataDisplay').textContent = 'データが見つかりません。';
        }
    });

    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.appendChild(createCalendar(currentYear, currentMonth));

    function saveDailyReflection(date, reflection) {
        localStorage.setItem('dailyReflection_' + date, reflection);
    }

    function createCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const calendar = document.createElement('table');
        calendar.className = 'calendar';
        const header = calendar.createTHead();
        const headerRow = header.insertRow();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const cell = headerRow.insertCell();
            cell.textContent = day;
        });
        const body = calendar.createTBody();
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = body.insertRow();
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfWeek) {
                    const cell = row.insertCell();
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = row.insertCell();
                    cell.textContent = date;
                    cell.classList.add('calendar-date');
                    cell.dataset.date = new Date(year, month, date).toLocaleDateString('ja-JP');
                    date++;
                }
            }
        }
        return calendar;
    }
});




// >>>>>>> 08f97f0 (main)

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-item');
    const saveBtn = document.getElementById('save-reflection')
    // const morningRoutine = document.getElementById('morning-routine');
    const reflection = document.getElementById('reflection');
    
    
    // スコープの問題を解決する： もしmorningRoutineが特定の関数内でのみ定義されている場合は、それを関数外で定義し、必要な関数からアクセスできるようにする
    let morningRoutine; // グローバルスコープで定義
    function loadMorningRoutine() {
        // 保存されたルーチンをロード
        const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
        items.forEach(itemText => {
            addRoutineItem(itemText, false);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        morningRoutine = document.getElementById('morning-routine');
        function addRoutineItem(itemText, save = true) {
            const li = document.createElement('li');
            li.textContent = itemText;
            morningRoutine.appendChild(li);
        
                // ローカルストレージに保存
                if (save) {
                    const items = JSON.parse(localStorage.getItem('morningRoutine')) || [];
                    items.push(itemText);
                    localStorage.setItem('morningRoutine', JSON.stringify(items));
                }
            }
        
    });

// <<<<<<< HEAD
    // 反省を保存
    saveBtn.addEventListener('click', () => {
// =======
    // 今日の行動計画を保存
    // saveBtn.addEventListener('click', () => {
// >>>>>>> 08f97f0 (main)
        const today = new Date().toLocaleDateString('ja-JP'); // 日本の日付形式で取得
        const reflectionWithDate = {
            date: today,
            text: reflection.value
        };
        localStorage.setItem('reflection', JSON.stringify(reflectionWithDate));
        alert('保存しました');
    });
    
    // jQueryを使用してページ読み込み時にアニメーションを表示
    $("main").slideDown(500);
    
    // Save クリックイベント
    $("#save").on("click", function(){
        const v = $("#textarea").val();
        localStorage.setItem("memo", v);
        alert("保存しました");
    });

    // Clear クリックイベント
    $("#clear").on("click", function(){
        localStorage.removeItem("memo");
        $("#textarea").val("");
        alert("削除しました");
    });

    // ページ読み込み時に保存データを表示
    if(localStorage.getItem("memo")){
        const v = localStorage.getItem("memo");
        $("#textarea").val(v);
    }
// <<<<<<< HEAD
});

// 夜になったら「おかえり」メッセージを表示
function showWelcomeBackMessage() {
    const welcomeBackMessage = document.getElementById('welcome-back-message');
    if (!welcomeBackMessage) return; // この行で要素がnullであれば、関数の残りの部分は実行されません
    const yesButton = document.getElementById('yes-button');
    const currentHour = new Date().getHours();

    // 仮に18時以降を「夜」とします。
    if (currentHour >= 18 && welcomeBackMessage) { // welcomeBackMessageがnullでないことを再確認
        welcomeBackMessage.style.display = 'block';
        yesButton.addEventListener('click', () => {
            reflection.focus(); // テキストエリアにフォーカス
        });
    }
}
// =======
// });

function checkAndShowWelcomeBackMessage() {
    const welcomeBackMessage = document.getElementById('welcome-back-message');
    const yesButton = document.getElementById('yes-button');
    const currentHour = new Date().getHours();

    // ページ訪問回数をローカルストレージから取得
    let visits = localStorage.getItem('pageVisits') || 0;
    visits++; // 訪問回数をインクリメント
    localStorage.setItem('pageVisits', visits); // 更新した訪問回数を保存

    // 0時以降かつ訪問回数が1より大きい場合にメッセージを表示
    if (currentHour >= 0 && visits > 1) {
        if (welcomeBackMessage) {
            welcomeBackMessage.style.display = 'block';
            yesButton.addEventListener('click', () => {
                const reflection = document.getElementById('reflection');
                if (reflection) reflection.focus(); // テキストエリアにフォーカス
            });
        }
    }
}

// ページ読み込み時に関数を実行
document.addEventListener('DOMContentLoaded', checkAndShowWelcomeBackMessage);



// >>>>>>> 08f97f0 (main)
 // 背景を朝と夜とで変える
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const hour = new Date().getHours();
        
    if (hour >= 6 && hour < 18) {
            // 朝6時から夜18時までは朝の背景
            body.classList.add('morning');
    } else {
            // 夜18時から朝6時までは夜の背景
             body.classList.add('night');
            }
        });  


// 語録の配列
const quotes = [
    "すーさんの今日１日語録"+"一口サイズでいいんやで",
    "すーさんの今日１日語録"+"毎日の積み重ねやで。ほなやろか",
    "すーさんの今日１日語録"+"継続した事だけが身につくんやで",
    "すーさんの今日１日語録"+"あれ？そこまで進んでるん！？",
    "すーさんの今日１日語録"+"頑張るってどういう事なんやろうね〜",
    "すーさんの今日１日語録"+"お前さんはお前さんよ。",
    "すーさんの今日１日語録"+"今日もいい日やったかい？一歩ずつ一歩ずつ",
    "すーさんの今日１日語録"+"気づいたら早いでよ。選択肢は狭ければ 狭いほどいいんやで",
    "すーさんの今日１日語録"+"どう生きるかなんて、皆ちゃうからなー",
    "すーさんの今日１日語録"+"いらん努力してないやろか？",
    "すーさんの今日１日語録"+"おおきに！見とるからなー",
    "すーさんの今日１日語録"+"出来ひんかった後悔せんと、明日どう動くか考えよ。",
    // 他にも追加
];

// ランダムに語録を選ぶ関数
function getRandomQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

// 語録をポップアップ表示する関数
function showRandomQuote() {
    const quote = getRandomQuote();
    alert(quote); // カスタムポップアップに置き換えることも可能
}
// <<<<<<< HEAD

// 保存ボタンクリック時のイベントハンドラを設定
document.getElementById('save-settings').addEventListener('click', () => {
    // ここで環境設定を保存するコードを追加することもできます
    // 例: localStorage.setItem('setting', document.getElementById('setting-input').value);

    // 語録ポップアップを表示
    showRandomQuote();
});

// タイマー
document.addEventListener('DOMContentLoaded', function() {
    var timeLeft = 3 * 60; // 5分を秒単位で計算
// =======
    // 語録ポップアップを表示
    showRandomQuote();
// });

// タイマー
document.addEventListener('DOMContentLoaded', function() {
    var timeLeft = 3 * 60; // 3分を秒単位で計算
// >>>>>>> 08f97f0 (main)
    var timerElement = document.getElementById('timer');

    var timerId = setInterval(function() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        // 分と秒が10未満の場合は、先頭に0を追加する
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // タイマーを更新
        timerElement.textContent = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert('3分が経過しました。自分の時間を楽しんでください！');
        } else {
            timeLeft -= 1;
        }
    }, 1000); // 1秒ごとに更新
// <<<<<<< HEAD
});
// =======
});

// // データを保存する関数
// function saveDataForDate(data) {
//     const today = new Date().toLocaleDateString('ja-JP');
//     localStorage.setItem(today, JSON.stringify(data));
//     alert('今日のデータを保存しました');
// }

// 特定の日付のデータを取得する関数
function loadDataForDate(date) {
    const data = localStorage.getItem(date);
    if (data) {
        return JSON.parse(data);
    } else {
        alert('この日のデータはありません');
        return null;
    }
}

// // 特定の日付のデータを読み込む例
// const dateToLoad = new Date().toLocaleDateString('ja-JP');
// const loadedData = loadDataForDate(dateToLoad);
// console.log(loadedData);


// ユーザーインターフェイスJavaScript (機能実装)
document.getElementById('addRoutineBtn').addEventListener('click', function() {
    const newRoutine = document.getElementById('newRoutineInput').value;
    if (newRoutine) {
        addNewRoutine(newRoutine);
        document.getElementById('newRoutineInput').value = ''; // 入力フィールドをクリア
    }
});

function addNewRoutine(routineName) {
    const container = document.getElementById('routineList');
    const routineContainer = document.createElement('div');
    routineContainer.className = 'routine-item';

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.id = routineName;
    newCheckbox.name = 'routine';
    newCheckbox.value = routineName;

    const label = document.createElement('label');
    label.htmlFor = routineName;
    label.appendChild(document.createTextNode(routineName));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.onclick = function() {
        container.removeChild(routineContainer);
    };

    routineContainer.appendChild(newCheckbox);
    routineContainer.appendChild(label);
    routineContainer.appendChild(deleteBtn);
    container.appendChild(routineContainer);
}

// 初期チェックリスト項目の削除機能を追加
document.querySelectorAll('.routine-item button').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.parentNode;
        item.parentNode.removeChild(item);
    });
});

// 保存または編集の処理を行う関数の実装
let isEditMode = false; // 編集モードかどうかを判定するフラグ

function saveOrEditData() {
    if (isEditMode) {
        // 編集モードの場合の処理
        // ここに編集内容を保存するコードを記述
        console.log('編集内容を保存');
    } else {
        // 保存モードの場合の処理
        // ここに新規内容を保存するコードを記述
        console.log('新規内容を保存');
    }
    // モードの切り替え
    isEditMode = !isEditMode; // モードを切り替える
}
// 編集モードに入るトリガーとなる処理
function enterEditMode() {
    // 編集モードに必要なUIの変更やフラグの設定
    isEditMode = true;
}

function updateMascotState() {
    // 進捗に応じてマスコットの状態を更新するロジックをここに実装
    // 例として、単純な状態変化を実装
    const mascotImage = document.getElementById('mascotImage');
    const states = ['img/1.png', 'img/2.png', 'img/3.png','img/4.png','img/5.png','img/6.png','img/7.png'];
    let currentState = states.indexOf(mascotImage.src.split('/').pop());

    currentState = (currentState + 1) % states.length; // 次の状態へ
    mascotImage.src = states[currentState]; // 画像を更新
}

// 全ての項目に答えるとマスコットが成長する機能と、成長段階が上がるたびにモーダルウィンドウでお祝いメッセージを表示する機能
let progress = 0; // ユーザーの進捗状況（例：0から100までのパーセンテージ）
const totalItems = 4; // 答えるべき項目の総数
let currentStage = 0; // マスコットの現在の成長段階

// 進捗を更新する関数（項目に答えるたびに呼び出す）
function updateProgress() {
  progress++; // 進捗を更新
  if (progress >= totalItems) {
    // 全ての項目に答えたら
    currentStage++; // マスコットの成長段階を上げる
    updateMascotState(); // マスコットの状態を更新
    showCongratulationModal(); // お祝いのモーダルウィンドウを表示
  }
}

// モーダルウィンドウを表示する関数
function showCongratulationModal() {
  document.getElementById('congratulationModal').style.display = 'block';
}

// モーダルウィンドウを閉じる関数
document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('congratulationModal').style.display = 'none';
});

// マスコットの状態を更新する関数（成長段階に応じて）
function updateMascotState() {
  // 成長段階に応じてマスコットの画像や状態を更新するロジックをここに実装
}

// document.addEventListener('DOMContentLoaded', function() {
//     // 語録の配列
//     var quotes = [
//         "語録1",
//         "語録2",
//         "語録3",
//         // 他の語録を追加
//     ];

//     // ランダムに語録を選択
//     var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

// });


document.addEventListener('DOMContentLoaded', function() {
    const actionButton = document.getElementById('action-btn');
    let mode = 'edit'; // 初期モードを 'edit' に設定

    actionButton.addEventListener('click', function() {
        switch(mode) {
            case 'edit':
                console.log('編集モードです');
                // ここに編集に関する処理を書く
                mode = 'save'; // 次のモードを 'save' に変更
                actionButton.textContent = '保存'; // ボタンのテキストを更新
                break;
            case 'save':
                console.log('保存モードです');
                // ここに保存に関する処理を書く
                mode = 'delete'; // 次のモードを 'delete' に変更
                actionButton.textContent = '削除'; // ボタンのテキストを更新
                break;
            case 'delete':
                const confirmDelete = confirm('本当に削除しますか？');
                if (confirmDelete) {
                    console.log('削除処理');
                    // ここに削除に関する処理を書く
                }
                mode = 'edit'; // 最初のモードに戻る
                actionButton.textContent = '編集'; // ボタンのテキストを更新
                break;
            default:
                console.log('不明なモードです');
                break;
        }
    });
});

document.getElementById('loadDataButton').addEventListener('click', function() {
    // ここでローカルストレージからデータを取得
    var myData = localStorage.getItem('myData');
    
    // データが存在する場合、それを 'dataDisplay' 要素に表示
    if (myData) {
        document.getElementById('dataDisplay').textContent = myData;
    } else {
        // データが存在しない場合の処理
        document.getElementById('dataDisplay').textContent = 'データが見つかりません。';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-reflection');
    const reflection = document.getElementById('reflection');

    // 今日の行動計画を保存
    saveBtn.addEventListener('click', () => {
        const today = new Date().toLocaleDateString('ja-JP');
        const reflectionText = reflection.value;
        saveDailyReflection(today, reflectionText); // 保存する関数を呼び出す
        alert('振り返りを保存しました');
    });

    // カレンダーで日付が選択されたときの処理
    function onDateSelected(date) {
        const formattedDate = date.toLocaleDateString('ja-JP');

        // 日付に関連する振り返りを取得して表示
        const reflection = localStorage.getItem('dailyReflection_' + formattedDate);
        if (reflection) {
            console.log('振り返り:', reflection);
        } else {
            console.log('その日の振り返りはありません');
        }
    }

    // カレンダーのイベントリスナーを設定
    const calendar = document.getElementById('calendar-container');
    calendar.addEventListener('click', (event) => {
        if (event.target.classList.contains('calendar-date')) {
            const selectedDate = new Date(event.target.dataset.date);
            onDateSelected(selectedDate);
        }
    });
});

// 今日の行動計画を保存する関数
function saveDailyReflection(date, reflection) {
    localStorage.setItem('dailyReflection_' + date, reflection);
}

// カレンダーを表示するコンテナを取得
const calendarContainer = document.getElementById('calendar-container');

// カレンダーを作成する関数
function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    const calendar = document.createElement('table');
    calendar.className = 'calendar';

    // カレンダーのヘッダーを作成
    const header = calendar.createTHead();
    const headerRow = header.insertRow();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const cell = headerRow.insertCell();
        cell.textContent = day;
    });

    // カレンダーの日付部分を作成
    const body = calendar.createTBody();
    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = body.insertRow();
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfWeek) {
                const cell = row.insertCell();
                cell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                const cell = row.insertCell();
                cell.textContent = date;
                cell.classList.add('calendar-date'); // 日付にクラスを追加
                cell.dataset.date = new Date(year, month, date).toLocaleDateString('ja-JP'); // 日付をデータ属性として追加
                date++;
            }
        }
    }

    return calendar;
}

// 今日の日付を取得
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

// カレンダーを作成してコンテナに追加
calendarContainer.appendChild(createCalendar(currentYear, currentMonth));


// document.addEventListener('DOMContentLoaded', () => {
//     const saveBtn = document.getElementById('save-reflection');
//     const reflection = document.getElementById('reflection');

//     // // 今日の行動計画を保存
//     // saveBtn.addEventListener('click', () => {
//     //     const today = new Date().toLocaleDateString('ja-JP');
//     //     const reflectionText = reflection.value;
//     //     saveDailyReflection(today, reflectionText); // 保存する関数を呼び出す
//     //     alert('振り返りを保存しました');
//     // });

//     // カレンダーで日付が選択されたときの処理
//     function onDateSelected(date) {
//         const formattedDate = date.toLocaleDateString('ja-JP');

//         // 日付に関連する振り返りを取得して表示
//         const reflection = localStorage.getItem('dailyReflection_' + formattedDate);
//         if (reflection) {
//             console.log('振り返り:', reflection);
//         } else {
//             console.log('その日の振り返りはありません');
//         }
//     }

//     // カレンダーのDOM要素を取得
//     const calendarContainer = document.getElementById('calendar-container');

//     // 仮のカレンダーを作成（実際のカレンダーの実装に置き換える必要があります）
//     const calendar = {
//         onDateSelected: onDateSelected
//     };

//     // カレンダーの日付が選択されたときに関数を呼び出すイベントリスナーを設定
//     calendarContainer.addEventListener('click', (event) => {
//         if (event.target.classList.contains('calendar-date')) {
//             const selectedDate = new Date(event.target.dataset.date);
//             calendar.onDateSelected(selectedDate);
//         }
//     });
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const saveBtn = document.getElementById('save-reflection');
//     const reflection = document.getElementById('reflection');

//     // 今日の行動計画を保存
//     saveBtn.addEventListener('click', () => {
//         const today = new Date().toLocaleDateString('ja-JP');
//         const reflectionText = reflection.value;
//         saveDailyReflection(today, reflectionText); // 保存する関数を呼び出す
//         alert('振り返りを保存しました');
//     });

//     // カレンダーで日付が選択されたときの処理
//     function onDateSelected(date) {
//         const formattedDate = date.toLocaleDateString('ja-JP');

//         // 日付に関連する振り返りを取得して表示
//         const reflection = localStorage.getItem('dailyReflection_' + formattedDate);
//         if (reflection) {
//             console.log('振り返り:', reflection);
//         } else {
//             console.log('その日の振り返りはありません');
//         }
//     }

//     // カレンダーのイベントリスナーを設定
//     calendar.onDateSelected = onDateSelected;

//     // 保存または編集の処理を行う関数の実装
//     let isEditMode = false;

//     function saveOrEditData() {
//         if (isEditMode) {
//             console.log('編集内容を保存');
//             // ここに編集内容を保存するコードを記述
//         } else {
//             console.log('新規内容を保存');
//             // ここに新規内容を保存するコードを記述
//         }
//         // モードの切り替え
//         isEditMode = !isEditMode; // モードを切り替える
//     }

//     // 編集モードに入るトリガーとなる処理
//     function enterEditMode() {
//         // 編集モードに必要なUIの変更やフラグの設定
//         isEditMode = true;
//     }
// });

// // 今日の行動計画を保存する関数
// function saveDailyPlan(plan) {
//     const today = new Date().toLocaleDateString('ja-JP'); // 今日の日付を取得
//     localStorage.setItem('dailyPlan_' + today, plan);
// }

// // 1日の振り返りを保存する関数
// function saveDailyReflection(date, reflection) {
//     localStorage.setItem('dailyReflection_' + date, reflection);
// }


// // カレンダーを表示するコンテナを取得
// const calendarContainer = document.getElementById('calendar-container');

// // カレンダーを作成する関数
// function createCalendar(year, month) {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfWeek = new Date(year, month, 1).getDay();
    
//     const calendar = document.createElement('table');
//     calendar.className = 'calendar';

//     // カレンダーのヘッダーを作成
//     const header = calendar.createTHead();
//     const headerRow = header.insertRow();
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     daysOfWeek.forEach(day => {
//         const cell = headerRow.insertCell();
//         cell.textContent = day;
//     });

//     // カレンダーの日付部分を作成
//     const body = calendar.createTBody();
//     let date = 1;
//     for (let i = 0; i < 6; i++) {
//         const row = body.insertRow();
//         for (let j = 0; j < 7; j++) {
//             if (i === 0 && j < firstDayOfWeek) {
//                 const cell = row.insertCell();
//                 cell.textContent = '';
//             } else if (date > daysInMonth) {
//                 break;
//             } else {
//                 const cell = row.insertCell();
//                 cell.textContent = date;
//                 date++;
//             }
//         }
//     }

//     return calendar;
// }

// // 今日の日付を取得
// const today = new Date();
// const currentYear = today.getFullYear();
// const currentMonth = today.getMonth();

// // カレンダーを作成してコンテナに追加
// calendarContainer.appendChild(createCalendar(currentYear, currentMonth));
// >>>>>>> 08f97f0 (main)
