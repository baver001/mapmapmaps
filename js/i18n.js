(function (global) {
  const STRINGS = {
    en: {
      metaDescription:
        "MapMapMaps — free GeoGuessr-style game on Mapillary 360° panoramas. No paid APIs.",
      pageTitle: "MapMapMaps — Guess the location",
      runLabel: "Run",
      progressAria: "Run progress",
      stopOf: "View {n} of {total}",
      runComplete: "Run complete!",
      stopCleared: "View {n} done",
      pts: "pts",
      ptsTotal: "{score} pts total",
      distanceM: "{d} m away",
      distanceKm1: "{d} km away",
      distanceKm: "{d} km away",
      placeholderGuess: "City or country…",
      guess: "Guess",
      newSpot: "New spot",
      pickOnMap: "Pick on map",
      closeMap: "Close map",
      streetView: "← Street view",
      dropPin: "Drop a pin on the map",
      clearPin: "Clear pin",
      yourGuess: "Your guess",
      actual: "Actual",
      continue: "Continue",
      nextStop: "Next stop →",
      finishRun: "Finish run",
      donate: "Donate",
      donateTitle: "Support MapMapMaps",
      gameComplete: "Game complete!",
      thisGame: "This game",
      personalBest: "Personal best",
      playAgain: "Play again",
      firstComplete: "First game complete!",
      firstCompleteSub: "Your score is saved on this device. Beat it next time!",
      newBest: "New personal best!",
      beatRecord: "You beat your previous record of {score}.",
      awayFromRecord: "{diff} away from your record — try again!",
      greatRun: "Great run! See if you can go even higher.",
      cheerPerfect: "Perfect!",
      cheerBrilliant: "Brilliant!",
      cheerGreat: "Great job!",
      cheerNice: "Nice!",
      cheerKeep: "Keep going!",
      cheerNext: "You'll get it next time!",
      toastPin: "Pin placed — press Guess",
      toastTypeOrMap: "Type a city or pick on the map",
      toastPinCleared: "Pin cleared",
      toastLoadFailed: "Load failed",
      toastGuessFailed: "Guess failed",
      mapPin: "Map pin",
      unknown: "Unknown",
      errGeocoderBusy: "Geocoder busy — wait a moment",
      errGeocoder: "Geocoder error ({status})",
      errPlaceNotFound: "Place not found — try another spelling",
      errViewerConfig: "Viewer config unavailable",
      errLoadLocation: "Failed to load location",
      errNonPano: "Non-360 image rejected",
      errViewer: "Viewer error",
      errSdk: "Failed to load Mapillary or MapLibre",
      errRound: "Could not start a round",
      errStartup:
        "Could not start MapMapMaps. Ensure MAPILLARY_ACCESS_TOKEN is set and run npm run seeds.",
      sfxMute: "Mute sounds",
      sfxUnmute: "Unmute sounds",
    },
    ru: {
      metaDescription:
        "MapMapMaps — бесплатная игра в стиле GeoGuessr на панорамах Mapillary 360°.",
      pageTitle: "MapMapMaps — Угадай место",
      runLabel: "Серия",
      progressAria: "Прогресс серии",
      stopOf: "Панорама {n} из {total}",
      runComplete: "Серия пройдена",
      stopCleared: "Панорама {n} пройдена",
      pts: "очков",
      ptsTotal: "Всего {score}",
      distanceM: "{d} метров",
      distanceKm1: "{d} километра",
      distanceKm: "{d} километров",
      placeholderGuess: "Город или страна…",
      guess: "Угадать",
      newSpot: "Другое место",
      pickOnMap: "Выбрать на карте",
      closeMap: "Закрыть карту",
      streetView: "← К панораме",
      dropPin: "Поставьте метку на карте",
      clearPin: "Убрать метку",
      yourGuess: "Ваш ответ",
      actual: "Верное место",
      continue: "Дальше",
      nextStop: "Следующая панорама →",
      finishRun: "Завершить серию",
      donate: "Поддержать",
      donateTitle: "Поддержать MapMapMaps",
      gameComplete: "Серия завершена!",
      thisGame: "Счёт за серию",
      personalBest: "Личный рекорд",
      playAgain: "Играть снова",
      firstComplete: "Первое прохождение!",
      firstCompleteSub:
        "Результат сохранён на этом устройстве. Попробуйте побить его в следующий раз!",
      newBest: "Новый личный рекорд!",
      beatRecord: "Вы улучшили прошлый результат: {score}.",
      awayFromRecord: "До рекорда осталось {diff} — попробуйте ещё!",
      greatRun: "Отличная серия! Можно ещё лучше.",
      cheerPerfect: "Идеально!",
      cheerBrilliant: "Блестяще!",
      cheerGreat: "Отлично!",
      cheerNice: "Неплохо!",
      cheerKeep: "Так держать!",
      cheerNext: "В следующий раз получится!",
      toastPin: "Метка стоит — нажмите «Угадать»",
      toastTypeOrMap: "Введите город или выберите на карте",
      toastPinCleared: "Метка убрана",
      toastLoadFailed: "Не удалось загрузить",
      toastGuessFailed: "Ошибка ответа",
      mapPin: "Метка на карте",
      unknown: "Неизвестно",
      errGeocoderBusy: "Геокодер занят — подождите",
      errGeocoder: "Ошибка геокодера ({status})",
      errPlaceNotFound: "Место не найдено — проверьте написание",
      errViewerConfig: "Нет конфигурации просмотра",
      errLoadLocation: "Не удалось загрузить локацию",
      errNonPano: "Не 360° изображение",
      errViewer: "Ошибка просмотра",
      errSdk: "Не загрузились Mapillary или MapLibre",
      errRound: "Не удалось начать раунд",
      errStartup:
        "Не удалось запустить MapMapMaps. Проверьте MAPILLARY_ACCESS_TOKEN и npm run seeds.",
      sfxMute: "Выключить звук",
      sfxUnmute: "Включить звук",
    },
    es: {
      metaDescription:
        "MapMapMaps — juego gratis estilo GeoGuessr con panoramas 360° de Mapillary.",
      pageTitle: "MapMapMaps — Adivina el lugar",
      runLabel: "Partida",
      progressAria: "Progreso de la partida",
      stopOf: "Vista {n} de {total}",
      runComplete: "¡Partida completa!",
      stopCleared: "Vista {n} acertada",
      pts: "pts",
      ptsTotal: "{score} pts en total",
      distanceM: "a {d} m",
      distanceKm1: "a {d} km",
      distanceKm: "a {d} km",
      placeholderGuess: "Ciudad o país…",
      guess: "Adivinar",
      newSpot: "Otro lugar",
      pickOnMap: "En el mapa",
      closeMap: "Cerrar mapa",
      streetView: "← Calle",
      dropPin: "Coloca un pin en el mapa",
      clearPin: "Quitar pin",
      yourGuess: "Tu respuesta",
      actual: "Real",
      continue: "Continuar",
      nextStop: "Siguiente →",
      finishRun: "Terminar",
      donate: "Donar",
      donateTitle: "Apoyar MapMapMaps",
      gameComplete: "¡Juego terminado!",
      thisGame: "Esta partida",
      personalBest: "Mejor marca",
      playAgain: "Jugar de nuevo",
      firstComplete: "¡Primera partida!",
      firstCompleteSub: "Tu puntuación se guarda en este dispositivo.",
      newBest: "¡Nuevo récord!",
      beatRecord: "Superaste tu récord anterior: {score}.",
      awayFromRecord: "Te faltan {diff} para el récord — ¡inténtalo!",
      greatRun: "¡Buena partida! Puedes mejorar aún más.",
      cheerPerfect: "¡Perfecto!",
      cheerBrilliant: "¡Brillante!",
      cheerGreat: "¡Buen trabajo!",
      cheerNice: "¡Bien!",
      cheerKeep: "¡Sigue así!",
      cheerNext: "¡La próxima lo logras!",
      toastPin: "Pin colocado — pulsa Adivinar",
      toastTypeOrMap: "Escribe una ciudad o elige en el mapa",
      toastPinCleared: "Pin quitado",
      toastLoadFailed: "Error al cargar",
      toastGuessFailed: "Error al adivinar",
      mapPin: "Pin en mapa",
      unknown: "Desconocido",
      errGeocoderBusy: "Geocodificador ocupado — espera",
      errGeocoder: "Error del geocodificador ({status})",
      errPlaceNotFound: "Lugar no encontrado — prueba otra ortografía",
      errViewerConfig: "Configuración no disponible",
      errLoadLocation: "No se pudo cargar la ubicación",
      errNonPano: "Imagen no 360°",
      errViewer: "Error del visor",
      errSdk: "No se cargó Mapillary o MapLibre",
      errRound: "No se pudo iniciar la ronda",
      errStartup:
        "No se pudo iniciar MapMapMaps. Comprueba MAPILLARY_ACCESS_TOKEN y npm run seeds.",
      sfxMute: "Silenciar",
      sfxUnmute: "Activar sonido",
    },
    de: {
      metaDescription:
        "MapMapMaps — kostenloses GeoGuessr-Spiel mit Mapillary-360°-Panoramen.",
      pageTitle: "MapMapMaps — Ort erraten",
      runLabel: "Lauf",
      progressAria: "Fortschritt",
      stopOf: "Ansicht {n} von {total}",
      runComplete: "Lauf geschafft!",
      stopCleared: "Ansicht {n} geschafft",
      pts: "Pkt.",
      ptsTotal: "{score} Pkt. gesamt",
      distanceM: "{d} m entfernt",
      distanceKm1: "{d} km entfernt",
      distanceKm: "{d} km entfernt",
      placeholderGuess: "Stadt oder Land…",
      guess: "Raten",
      newSpot: "Neuer Ort",
      pickOnMap: "Auf Karte",
      closeMap: "Karte schließen",
      streetView: "← Straßenansicht",
      dropPin: "Pin auf der Karte setzen",
      clearPin: "Pin entfernen",
      yourGuess: "Deine Schätzung",
      actual: "Tatsächlich",
      continue: "Weiter",
      nextStop: "Nächster Stopp →",
      finishRun: "Lauf beenden",
      donate: "Spenden",
      donateTitle: "MapMapMaps unterstützen",
      gameComplete: "Spiel beendet!",
      thisGame: "Dieser Lauf",
      personalBest: "Persönlicher Rekord",
      playAgain: "Nochmal spielen",
      firstComplete: "Erster Lauf geschafft!",
      firstCompleteSub: "Dein Score wird auf diesem Gerät gespeichert.",
      newBest: "Neuer Rekord!",
      beatRecord: "Du hast deinen Rekord {score} geschlagen.",
      awayFromRecord: "Noch {diff} bis zum Rekord — versuch es!",
      greatRun: "Starker Lauf! Du kannst noch höher.",
      cheerPerfect: "Perfekt!",
      cheerBrilliant: "Brilliant!",
      cheerGreat: "Gut gemacht!",
      cheerNice: "Nice!",
      cheerKeep: "Weiter so!",
      cheerNext: "Nächstes Mal klappt's!",
      toastPin: "Pin gesetzt — auf Raten drücken",
      toastTypeOrMap: "Stadt eingeben oder auf der Karte wählen",
      toastPinCleared: "Pin entfernt",
      toastLoadFailed: "Laden fehlgeschlagen",
      toastGuessFailed: "Raten fehlgeschlagen",
      mapPin: "Karten-Pin",
      unknown: "Unbekannt",
      errGeocoderBusy: "Geocoder beschäftigt — kurz warten",
      errGeocoder: "Geocoder-Fehler ({status})",
      errPlaceNotFound: "Ort nicht gefunden — andere Schreibweise",
      errViewerConfig: "Viewer-Konfiguration fehlt",
      errLoadLocation: "Ort konnte nicht geladen werden",
      errNonPano: "Kein 360°-Bild",
      errViewer: "Viewer-Fehler",
      errSdk: "Mapillary oder MapLibre nicht geladen",
      errRound: "Runde konnte nicht starten",
      errStartup:
        "MapMapMaps startet nicht. MAPILLARY_ACCESS_TOKEN und npm run seeds prüfen.",
      sfxMute: "Ton aus",
      sfxUnmute: "Ton an",
    },
    fr: {
      metaDescription:
        "MapMapMaps — jeu gratuit façon GeoGuessr sur panoramas 360° Mapillary.",
      pageTitle: "MapMapMaps — Devinez le lieu",
      runLabel: "Partie",
      progressAria: "Progression",
      stopOf: "Vue {n} sur {total}",
      runComplete: "Partie terminée !",
      stopCleared: "Vue {n} trouvée",
      pts: "pts",
      ptsTotal: "{score} pts au total",
      distanceM: "à {d} m",
      distanceKm1: "à {d} km",
      distanceKm: "à {d} km",
      placeholderGuess: "Ville ou pays…",
      guess: "Deviner",
      newSpot: "Autre vue",
      pickOnMap: "Sur la carte",
      closeMap: "Fermer la carte",
      streetView: "← Rue",
      dropPin: "Placez un repère sur la carte",
      clearPin: "Effacer le repère",
      yourGuess: "Votre réponse",
      actual: "Réel",
      continue: "Continuer",
      nextStop: "Suivant →",
      finishRun: "Terminer",
      donate: "Donner",
      donateTitle: "Soutenir MapMapMaps",
      gameComplete: "Partie terminée !",
      thisGame: "Cette partie",
      personalBest: "Record perso",
      playAgain: "Rejouer",
      firstComplete: "Première partie !",
      firstCompleteSub: "Score enregistré sur cet appareil.",
      newBest: "Nouveau record !",
      beatRecord: "Vous avez battu {score}.",
      awayFromRecord: "Encore {diff} pour le record !",
      greatRun: "Belle partie ! Vous pouvez faire mieux.",
      cheerPerfect: "Parfait !",
      cheerBrilliant: "Brillant !",
      cheerGreat: "Beau travail !",
      cheerNice: "Bien !",
      cheerKeep: "Continuez !",
      cheerNext: "Vous y arriverez !",
      toastPin: "Repère posé — Deviner",
      toastTypeOrMap: "Ville ou choix sur la carte",
      toastPinCleared: "Repère effacé",
      toastLoadFailed: "Échec du chargement",
      toastGuessFailed: "Échec",
      mapPin: "Repère carte",
      unknown: "Inconnu",
      errGeocoderBusy: "Géocodeur occupé — patientez",
      errGeocoder: "Erreur géocodeur ({status})",
      errPlaceNotFound: "Lieu introuvable — autre orthographe",
      errViewerConfig: "Config indisponible",
      errLoadLocation: "Lieu non chargé",
      errNonPano: "Pas une image 360°",
      errViewer: "Erreur du viewer",
      errSdk: "Mapillary ou MapLibre non chargé",
      errRound: "Impossible de démarrer",
      errStartup:
        "Impossible de lancer MapMapMaps. Vérifiez MAPILLARY_ACCESS_TOKEN et npm run seeds.",
      sfxMute: "Couper le son",
      sfxUnmute: "Activer le son",
    },
    pt: {
      metaDescription:
        "MapMapMaps — jogo grátis estilo GeoGuessr com panoramas 360° do Mapillary.",
      pageTitle: "MapMapMaps — Adivinhe o lugar",
      runLabel: "Partida",
      progressAria: "Progresso da partida",
      stopOf: "Vista {n} de {total}",
      runComplete: "Partida completa!",
      stopCleared: "Vista {n} acertada",
      pts: "pts",
      ptsTotal: "{score} pts no total",
      distanceM: "a {d} m",
      distanceKm1: "a {d} km",
      distanceKm: "a {d} km",
      placeholderGuess: "Cidade ou país…",
      guess: "Adivinhar",
      newSpot: "Outro lugar",
      pickOnMap: "No mapa",
      closeMap: "Fechar mapa",
      streetView: "← Rua",
      dropPin: "Marque um pin no mapa",
      clearPin: "Remover pin",
      yourGuess: "Seu palpite",
      actual: "Real",
      continue: "Continuar",
      nextStop: "Próxima →",
      finishRun: "Finalizar",
      donate: "Doar",
      donateTitle: "Apoiar MapMapMaps",
      gameComplete: "Jogo completo!",
      thisGame: "Esta partida",
      personalBest: "Melhor marca",
      playAgain: "Jogar de novo",
      firstComplete: "Primeira partida!",
      firstCompleteSub: "Pontuação salva neste dispositivo.",
      newBest: "Novo recorde!",
      beatRecord: "Você superou {score}.",
      awayFromRecord: "Faltam {diff} para o recorde!",
      greatRun: "Ótima partida! Dá para ir além.",
      cheerPerfect: "Perfeito!",
      cheerBrilliant: "Brilhante!",
      cheerGreat: "Muito bem!",
      cheerNice: "Boa!",
      cheerKeep: "Continue!",
      cheerNext: "Na próxima você acerta!",
      toastPin: "Pin colocado — Adivinhar",
      toastTypeOrMap: "Digite uma cidade ou escolha no mapa",
      toastPinCleared: "Pin removido",
      toastLoadFailed: "Falha ao carregar",
      toastGuessFailed: "Falha ao adivinhar",
      mapPin: "Pin no mapa",
      unknown: "Desconhecido",
      errGeocoderBusy: "Geocodificador ocupado — aguarde",
      errGeocoder: "Erro do geocodificador ({status})",
      errPlaceNotFound: "Lugar não encontrado",
      errViewerConfig: "Config indisponível",
      errLoadLocation: "Falha ao carregar local",
      errNonPano: "Imagem não 360°",
      errViewer: "Erro do viewer",
      errSdk: "Mapillary ou MapLibre não carregou",
      errRound: "Não foi possível iniciar",
      errStartup:
        "Não foi possível iniciar MapMapMaps. Verifique MAPILLARY_ACCESS_TOKEN e npm run seeds.",
      sfxMute: "Silenciar",
      sfxUnmute: "Ativar som",
    },
    zh: {
      metaDescription: "MapMapMaps — 免费 GeoGuessr 风格游戏，Mapillary 360° 街景。",
      pageTitle: "MapMapMaps — 猜地点",
      runLabel: "本轮",
      progressAria: "进度",
      stopOf: "第 {n} / {total} 景",
      runComplete: "本轮完成！",
      stopCleared: "第 {n} 景完成",
      pts: "分",
      ptsTotal: "共 {score} 分",
      distanceM: "相差 {d} 米",
      distanceKm1: "相差 {d} 公里",
      distanceKm: "相差 {d} 公里",
      placeholderGuess: "城市或国家…",
      guess: "提交",
      newSpot: "换一景",
      pickOnMap: "地图选点",
      closeMap: "关闭地图",
      streetView: "← 街景",
      dropPin: "在地图上标记",
      clearPin: "清除标记",
      yourGuess: "你的答案",
      actual: "实际位置",
      continue: "继续",
      nextStop: "下一站 →",
      finishRun: "结束",
      donate: "捐赠",
      donateTitle: "支持 MapMapMaps",
      gameComplete: "游戏结束！",
      thisGame: "本局得分",
      personalBest: "个人最佳",
      playAgain: "再玩一次",
      firstComplete: "首次完成！",
      firstCompleteSub: "分数已保存在本设备。",
      newBest: "新纪录！",
      beatRecord: "你打破了 {score} 的纪录。",
      awayFromRecord: "距纪录还差 {diff}！",
      greatRun: "打得不错！还能更高。",
      cheerPerfect: "完美！",
      cheerBrilliant: "太棒了！",
      cheerGreat: "很好！",
      cheerNice: "不错！",
      cheerKeep: "继续加油！",
      cheerNext: "下次一定行！",
      toastPin: "已标记 — 点提交",
      toastTypeOrMap: "输入城市或在地图上选点",
      toastPinCleared: "已清除标记",
      toastLoadFailed: "加载失败",
      toastGuessFailed: "提交失败",
      mapPin: "地图标记",
      unknown: "未知",
      errGeocoderBusy: "地理编码繁忙 — 请稍候",
      errGeocoder: "地理编码错误 ({status})",
      errPlaceNotFound: "未找到地点",
      errViewerConfig: "查看器配置不可用",
      errLoadLocation: "无法加载位置",
      errNonPano: "非 360° 图像",
      errViewer: "查看器错误",
      errSdk: "Mapillary 或 MapLibre 未加载",
      errRound: "无法开始回合",
      errStartup: "无法启动 MapMapMaps。请检查 MAPILLARY_ACCESS_TOKEN 并运行 npm run seeds。",
      sfxMute: "静音",
      sfxUnmute: "开启声音",
    },
    ja: {
      metaDescription: "MapMapMaps — Mapillary 360°の無料 GeoGuessr 風ゲーム。",
      pageTitle: "MapMapMaps — 場所当て",
      runLabel: "ラン",
      progressAria: "進捗",
      stopOf: "ビュー {n}/{total}",
      runComplete: "ラン完了！",
      stopCleared: "ビュー {n} クリア",
      pts: "pt",
      ptsTotal: "合計 {score} pt",
      distanceM: "約 {d} m",
      distanceKm1: "約 {d} km",
      distanceKm: "約 {d} km",
      placeholderGuess: "都市または国…",
      guess: "回答",
      newSpot: "別の場所",
      pickOnMap: "地図で選ぶ",
      closeMap: "地図を閉じる",
      streetView: "← ストリート",
      dropPin: "地図にピンを置く",
      clearPin: "ピンを消す",
      yourGuess: "あなたの回答",
      actual: "正解",
      continue: "続ける",
      nextStop: "次へ →",
      finishRun: "終了",
      donate: "寄付",
      donateTitle: "MapMapMaps を支援",
      gameComplete: "ゲーム終了！",
      thisGame: "今回のスコア",
      personalBest: "自己ベスト",
      playAgain: "もう一度",
      firstComplete: "初クリア！",
      firstCompleteSub: "スコアはこの端末に保存されます。",
      newBest: "自己ベスト更新！",
      beatRecord: "前回の {score} を更新しました。",
      awayFromRecord: "ベストまであと {diff}！",
      greatRun: "いいラン！まだ伸ばせます。",
      cheerPerfect: "パーフェクト！",
      cheerBrilliant: "素晴らしい！",
      cheerGreat: "よくできました！",
      cheerNice: "ナイス！",
      cheerKeep: "その調子！",
      cheerNext: "次は当たる！",
      toastPin: "ピンを置きました — 回答を押す",
      toastTypeOrMap: "都市を入力するか地図で選ぶ",
      toastPinCleared: "ピンを消しました",
      toastLoadFailed: "読み込み失敗",
      toastGuessFailed: "回答失敗",
      mapPin: "地図のピン",
      unknown: "不明",
      errGeocoderBusy: "ジオコーダー混雑 — 少々待って",
      errGeocoder: "ジオコーダーエラー ({status})",
      errPlaceNotFound: "場所が見つかりません",
      errViewerConfig: "設定を取得できません",
      errLoadLocation: "位置の読み込み失敗",
      errNonPano: "360° ではありません",
      errViewer: "ビューアエラー",
      errSdk: "Mapillary / MapLibre の読み込み失敗",
      errRound: "ラウンドを開始できません",
      errStartup:
        "MapMapMaps を開始できません。MAPILLARY_ACCESS_TOKEN と npm run seeds を確認。",
      sfxMute: "ミュート",
      sfxUnmute: "音声オン",
    },
    ko: {
      metaDescription: "MapMapMaps — Mapillary 360° 무료 GeoGuessr 스타일 게임.",
      pageTitle: "MapMapMaps — 장소 맞히기",
      runLabel: "런",
      progressAria: "진행도",
      stopOf: "장면 {n}/{total}",
      runComplete: "런 완료!",
      stopCleared: "{n}번째 장면 클리어",
      pts: "점",
      ptsTotal: "총 {score}점",
      distanceM: "약 {d}m",
      distanceKm1: "약 {d}km",
      distanceKm: "약 {d}km",
      placeholderGuess: "도시 또는 나라…",
      guess: "제출",
      newSpot: "다른 장소",
      pickOnMap: "지도에서",
      closeMap: "지도 닫기",
      streetView: "← 거리뷰",
      dropPin: "지도에 핀 놓기",
      clearPin: "핀 지우기",
      yourGuess: "내 답",
      actual: "실제 위치",
      continue: "계속",
      nextStop: "다음 →",
      finishRun: "종료",
      donate: "후원",
      donateTitle: "MapMapMaps 후원",
      gameComplete: "게임 완료!",
      thisGame: "이번 점수",
      personalBest: "개인 최고",
      playAgain: "다시 하기",
      firstComplete: "첫 완주!",
      firstCompleteSub: "점수는 이 기기에 저장됩니다.",
      newBest: "신기록!",
      beatRecord: "이전 {score} 기록 갱신!",
      awayFromRecord: "기록까지 {diff} 남음!",
      greatRun: "좋은 런! 더 높일 수 있어요.",
      cheerPerfect: "완벽!",
      cheerBrilliant: "훌륭해요!",
      cheerGreat: "잘했어요!",
      cheerNice: "좋아요!",
      cheerKeep: "계속!",
      cheerNext: "다음엔 맞출 거예요!",
      toastPin: "핀을 놓았어요 — 제출",
      toastTypeOrMap: "도시 입력 또는 지도에서 선택",
      toastPinCleared: "핀 지움",
      toastLoadFailed: "불러오기 실패",
      toastGuessFailed: "제출 실패",
      mapPin: "지도 핀",
      unknown: "알 수 없음",
      errGeocoderBusy: "지오코더 사용 중 — 잠시 대기",
      errGeocoder: "지오코더 오류 ({status})",
      errPlaceNotFound: "장소를 찾을 수 없음",
      errViewerConfig: "뷰어 설정 없음",
      errLoadLocation: "위치 불러오기 실패",
      errNonPano: "360° 이미지 아님",
      errViewer: "뷰어 오류",
      errSdk: "Mapillary 또는 MapLibre 로드 실패",
      errRound: "라운드 시작 불가",
      errStartup:
        "MapMapMaps를 시작할 수 없습니다. MAPILLARY_ACCESS_TOKEN과 npm run seeds 확인.",
      sfxMute: "음소거",
      sfxUnmute: "소리 켜기",
    },
  };

  const SUPPORTED = Object.keys(STRINGS);

  function matchLocale(raw) {
    if (!raw) return null;
    const tag = String(raw).toLowerCase();
    const base = tag.split("-")[0];
    if (STRINGS[base]) return base;
    if (base === "pt" || tag.startsWith("pt")) return "pt";
    if (base === "zh" || tag.startsWith("zh")) return "zh";
    return null;
  }

  function resolveLocale() {
    const stored = localStorage.getItem("mapmapmaps_locale_v1");
    if (stored && STRINGS[stored]) return stored;
    const list = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (const raw of list) {
      const m = matchLocale(raw);
      if (m) return m;
    }
    return "en";
  }

  let locale = resolveLocale();

  function t(key, vars) {
    const bag = STRINGS[locale] || STRINGS.en;
    let s = bag[key] ?? STRINGS.en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return s;
  }

  function localeTag() {
    if (locale === "zh") return "zh-Hans";
    return locale;
  }

  function formatNumber(n) {
    try {
      return n.toLocaleString(localeTag());
    } catch {
      return String(n);
    }
  }

  /** Full word for points (Russian plural rules). */
  function formatPoints(n) {
    const num = Math.abs(Number(n) || 0);
    const formatted = formatNumber(num);
    if (locale === "ru") {
      const mod10 = num % 10;
      const mod100 = num % 100;
      let word = "очков";
      if (mod10 === 1 && mod100 !== 11) word = "очко";
      else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) word = "очка";
      return `${formatted} ${word}`;
    }
    if (locale === "en") {
      return `${formatted} ${num === 1 ? "point" : "points"}`;
    }
    return `${formatted} ${t("pts")}`;
  }

  /** Full word for meters (Russian). */
  function formatMeters(n) {
    const num = Math.abs(Number(n) || 0);
    const formatted = formatNumber(Math.round(num));
    if (locale === "ru") {
      const mod10 = num % 10;
      const mod100 = num % 100;
      let word = "метров";
      if (mod10 === 1 && mod100 !== 11) word = "метр";
      else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) word = "метра";
      return `${formatted} ${word}`;
    }
    return t("distanceM", { d: formatted });
  }

  function formatKilometers(n) {
    const num = Math.abs(Number(n) || 0);
    if (locale === "ru") {
      const rounded = num < 10 ? Math.round(num * 10) / 10 : Math.round(num);
      const intPart = Math.floor(rounded);
      const formatted = formatNumber(rounded);
      const mod10 = intPart % 10;
      const mod100 = intPart % 100;
      let word = "километров";
      if (mod10 === 1 && mod100 !== 11) word = "километр";
      else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) word = "километра";
      return `${formatted} ${word}`;
    }
    if (num < 10) return t("distanceKm1", { d: formatNumber(num.toFixed(1)) });
    return t("distanceKm", { d: formatNumber(Math.round(num)) });
  }

  function applyStatic() {
    document.documentElement.lang = localeTag();
    const title = document.querySelector("title");
    if (title) title.textContent = t("pageTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("metaDescription"));

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const attr = el.getAttribute("data-i18n-attr");
      const val = t(key);
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
  }

  global.MapMapMapsI18n = {
    t,
    locale,
    localeTag,
    formatNumber,
    formatPoints,
    formatMeters,
    formatKilometers,
    applyStatic,
    supported: SUPPORTED,
  };
})(window);
