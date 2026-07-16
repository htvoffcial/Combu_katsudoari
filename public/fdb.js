document.addEventListener('DOMContentLoaded', () => {
        // 画面全体のすべての要素にイベントを設定（イベント委譲というプロの技を使います）
        let pressTimer = null;
        let targetElement = null;

        // 【押し始めたとき】（PC・スマホ両対応）
        const startPress = (e) => {
            // もし画面全体（bodyやhtml）だったら無視する
            if (e.target === document.body || e.target === document.documentElement) return;

            targetElement = e.target;
            targetElement.classList.add('pressing');

            // 1. まずタップのフィードバック（不透明度を下げる）
            targetElement.style.opacity = '0.6';

            // 2. 長押しのタイマー起動（0.3秒押し続けたら1.5倍に拡大）
            pressTimer = setTimeout(() => {
                targetElement.style.transform = 'scale(1.2)';
                // 長押し中はタップの薄さを少し戻して、拡大を強調するのもアリ
                targetElement.style.opacity = '0.85'; 
            }, 300); // 300ms（0.3秒）で長押し判定
        };

        // 【離したとき・キャンセルされたとき】
        const endPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
            if (targetElement) {
                // 元の状態にふわっと戻す
                targetElement.style.transform = 'scale(1)';
                targetElement.style.opacity = '1';
                
                // アニメーションが終わる頃にクラスを外す
                const tempEl = targetElement;
                setTimeout(() => {
                    tempEl.classList.remove('pressing');
                }, 200);

                targetElement = null;
            }
        };

        // --- イベントの登録（PC用 ＆ スマホ用） ---
        // マウス／タッチ開始
        document.addEventListener('mousedown', startPress);
        document.addEventListener('touchstart', startPress, { passive: true });

        // マウス／タッチ終了
        document.addEventListener('mouseup', endPress);
        document.addEventListener('touchend', endPress);

        // 画面外に指やカーソルが外れた時の保険
        document.addEventListener('mouseleave', endPress);
        document.addEventListener('touchcancel', endPress);
    });