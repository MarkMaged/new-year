<template>
  <div class="scene-wrapper">
    <div
      v-for="flake in iceFlakes"
      :key="flake.id"
      class="iceflake"
      :style="{
        top: flake.y + 'px',
        left: flake.x + 'px',
        fontSize: flake.size + 'px',
        opacity: flake.opacity,
      }"
    >
      ❆
    </div>
    <!-- Backgrounds -->
    <div class="bg1" :style="{ opacity: bg1Opacity }"></div>
    <div class="bg2" :style="{ opacity: bg2Opacity }"></div>

    <!-- Santa sleigh -->
    <div class="sleigh-container">
      <img src="https://iili.io/fukJl49.png" class="sleigh" :class="{ animate: sleighAnimate }" @animationend="onSleighEnd"/>
    </div>

    <div
      style="
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div v-if="!isHaveName">
        <div class="scene">
          <form @submit.prevent="onSubmit" class="name-card">
            <div class="p-fluid">
              <InputText v-model="name" placeholder="اكتب الاسم" class="mb-3" />

              <Button
                label="تسجيل"
                type="submit"
                style="display: block; margin: 10px auto; height: 30px; padding: 0 10px"
              />
            </div>
          </form>
        </div>
      </div>
    <NewYearComponent v-if="isHaveName" :userName="name" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import NewYearComponent from '@/components/NewYear/NewYearComponent.vue'

const toast = useToast()

const showSuccess = () => {
  toast.add({
    severity: 'error',
    summary: 'كده مشكلة',
    detail: 'اكتب اسمك متخافش',
    life: 3000,
  })
}
const isHaveName = ref(false)
const name = ref('')
const onSubmit = () => {
  if (name.value) {
    isHaveName.value = true
  } else {
    showSuccess()
  }
}
// ------------------
// Background switch
// ------------------
const bg1Opacity = ref(1)
const bg2Opacity = ref(0)
onMounted(() =>
  setTimeout(() => {
    bg1Opacity.value = 0
    bg2Opacity.value = 1
  }, 1000),
)
const iceFlakes = ref([])

function createFlake() {
  return {
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * window.innerWidth,
    y: -20,
    size: 8 + Math.random() * 20,
    speed: 1 + Math.random() * 2,
    opacity: Math.random(),
  }
}

onMounted(() => {
  // initial flakes
  for (let i = 0; i < 50; i++) iceFlakes.value.push(createFlake())

  function animate() {
    iceFlakes.value.forEach((flake) => {
      flake.y += flake.speed
      if (flake.y > window.innerHeight) {
        // reset flake to top
        Object.assign(flake, createFlake())
        flake.y = -20
      }
    })
    requestAnimationFrame(animate)
  }
  animate()
})
// ------------------
// Santa sleigh animation
// ------------------
const sleighAnimate = ref(false)
const showInput = ref(false)
function onSleighEnd(e) {
  console.log("F",e.animationName);

  if (e.animationName === 'flyIn-b4e148ca') {
    showInput.value = true
  }
}
onMounted(() => {
  sleighAnimate.value = true
})
// ------------------
// Countdown logic
// ------------------
const christmasTargetText = ref('')
const newYearTargetText = ref('')
const christmas = reactive({
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
  bar: 0,
  status: 'Until Christmas',
})
const newYear = reactive({ days: 0, hours: 0, mins: 0, secs: 0, bar: 0, status: 'Until New Year' })

onMounted(() => {
  function nextChristmas(now) {
    let target = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0)
    if (now >= target) target = new Date(now.getFullYear() + 1, 11, 25, 0, 0, 0, 0)
    return target
  }
  function nextNewYear(now) {
    return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0, 0)
  }
  function formatTargetDate(d) {
    return d.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  function updateOnce() {
    const now = new Date()
    const xmas = nextChristmas(now)
    const ny = nextNewYear(now)
    christmasTargetText.value = `Target: ${formatTargetDate(xmas)}`
    newYearTargetText.value = `Target: ${formatTargetDate(ny)}`
    updateCountdown(xmas, christmas)
    updateCountdown(ny, newYear)
  }

  function updateCountdown(target, obj) {
    const diff = target - new Date()
    const totalSec = Math.floor(diff / 1000)
    const days = Math.floor(totalSec / 86400)
    const hours = Math.floor((totalSec % 86400) / 3600)
    const mins = Math.floor((totalSec % 3600) / 60)
    const secs = totalSec % 60
    obj.days = days
    obj.hours = hours
    obj.mins = mins
    obj.secs = secs
    obj.status =
      diff <= 0 ? 'Happening now!' : `Remaining: ${days}d ${String(hours).padStart(2, '0')}h`
    const cycleStart = new Date(
      target.getFullYear() - 1,
      target.getMonth(),
      target.getDate(),
      0,
      0,
      0,
      0,
    )
    const cycleEnd = new Date(target)
    obj.bar = Math.min(
      100,
      Math.max(0, ((new Date() - cycleStart) / (cycleEnd - cycleStart)) * 100),
    )
  }

  updateOnce()
  setInterval(updateOnce, 1000)
})
</script>

<style scoped>
:root {
  --bg: #081226;
  --card: #0f2740;
  --ice: #bfe6ff;
  --accent: #d3817b;
  --glass: rgba(255, 255, 255, 0.06);
  --muted: rgba(255, 255, 255, 0.801);
  --gold: #ffd166;
}
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
body {
  margin: 0;
  font-family: 'Montserrat', system-ui, Arial;
  background:
    radial-gradient(1200px 600px at 10% 10%, rgba(59, 105, 160, 0.16), transparent 5%),
    radial-gradient(900px 400px at 90% 90%, rgba(123, 211, 137, 0.06), transparent 10%), var(--bg);
  color: #eaf6ff;
  -webkit-font-smoothing: antialiased;
  display: flex;
  align-items: direct-start;
  justify-content: center;
  padding: 32px;
  overflow-x: hidden; /* voorkomt scrollbar */
  min-height: 100vh;
}

/* Beide lagen vullen het scherm */
body {
  margin: 0;
}
.iceflake {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  color: #ffffff;
  mix-blend-mode: screen;
}
.bg1,
.bg2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 2s ease;
}

/* Eerste afbeelding zichtbaar */
.bg1 {
  background-image: url('https://iili.io/fukJEYu.png');
  opacity: 1;
}

/* Tweede afbeelding onzichtbaar */
.bg2 {
  background-image: url('https://iili.io/fukJMpj.png');
  opacity: 0;
}

/* santa sleigh */

/* Positie buiten beeld */
.sleigh {
  width: 870px;
  height: 250px;
  position: absolute;
  top: 40%;
  right: -400px; /* start buiten beeld */
  transform: translateY(-50%);
  pointer-events: none;
}

/* Animatie */
@keyframes flyIn {
  0% {
    right: -400px;
    transform: translateY(-50%) scale(0.7) rotate(5deg);
    opacity: 0;
  }

  40% {
    opacity: 1;
  }

  70% {
    transform: translateY(-60%) scale(1.05);
  }

  100% {
    right: 60%;
    transform: translateY(-50%) scale(1) rotate(-2deg);
    opacity: 1;
  }
}

.sleigh.animate {
  animation: flyIn 5s ease-out forwards;
}

/* countdown cards */
.wrap {
  display: flex;
  gap: 28px;
  align-items: center;
  justify-content: center;
  padding: 48px;
  flex-wrap: wrap;
}

.title {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}
.icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(125, 211, 252, 0.12), rgba(124, 58, 237, 0.08));
  font-size: 22px;
  color: var(--accent);
  box-shadow: inset 0 -6px 18px rgba(0, 0, 0, 0.25);
}
h2 {
  font-size: 18px;
  margin: 0;
}
p.small {
  color: var(--muted);
  margin: 6px 0 14px;
  font-size: 13px;
}

.count {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 16px;
}
.unit {
  background: var(--glass);
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  flex: 1;
  min-width: 56px;
}
.num {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
}
.label {
  font-size: 11px;
  color: var(--muted);
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.meta {
  font-size: 12px;
  color: var(--muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  margin-top: 10px;
}
.bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), #8b5cf6);
  transition: width 600ms linear;
}
/* end countdown cards */

/* scene */

.scene {
  width: 100%;
  max-width: 400px;
  height: 200px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border-radius: 18px;
  padding: 24px;
  box-shadow:
    0 10px 30px rgba(2, 6, 23, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
}

header {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.title {
  display: flex;
  gap: 12px;
  align-items: baseline;
}
.title h1 {
  margin: 0;
  font-family: 'Montserrat', system-ui, Arial;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 28px;
  color: var(--ice);
}
.title span {
  font-size: 13px;
  color: var(--muted);
}

.controls {
  display: flex;
  gap: 8px;
  align-items: center;
}
.btn {
  background: var(--glass);
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: var(--ice);
  backdrop-filter: blur(6px);
}
.btn:active {
  transform: translateY(1px);
}

.btn:hover {
  transform: translateY(-6px);
  box-shadow: 4px 8px 40px rgba(228, 1, 1, 0.904);
}

/* calendar */
.calendar {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  align-items: start;
}

.weekday {
  text-align: center;
  font-size: 12px;
  color: var(--muted);
  padding: 8px 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.day {
  min-height: 96px;
  background: linear-gradient(180deg, rgba(139, 193, 255, 0.637), rgba(63, 54, 54, 0.637));
  border-radius: 10px;
  padding: 10px;
  position: relative;
  overflow: visible;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.day:hover {
  transform: translateY(-6px);
  box-shadow: 4px 8px 40px rgba(228, 1, 1, 0.904);
}

.day .num {
  font-weight: 700;
  font-size: 18px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  color: var(--ice);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.day .note {
  margin-top: 8px;
  font-size: 13px;
  color: var(--muted);
  opacity: 0.95;
}

/* empty day placeholder */
/*.empty{background:transparent;border:0;box-shadow:none;}*/

/* special: Christmas */
.christmas {
  background-image: url('https://iili.io/fukJ12e.png');
  background-position: center;
  background-size: cover;
  box-shadow: 0 6px 20px rgba(255, 209, 102, 0.04);
  position: relative;
  overflow: visible;
}

.christmas .tag {
  display: inline-block;
  margin-top: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 12px;
  font-weight: 700;
  color: var(--ice);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

/* new years eve */
.newyears {
  background-image: url('https://iili.io/fukJGkb.png');
  background-position: center;
  background-size: cover;
  color: gold;
  border: 1px solid rgb(241, 241, 238);
}

.newyears .tag {
  font-weight: bold;
  margin-top: 6px;
  color: var(--ice);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.january.newyear {
  background-image: url('https://iili.io/fukJaBS.png');
  background-position: center;
  background-size: cover;
  box-shadow: 0 6px 20px rgba(255, 209, 102, 0.04);
  position: relative;
  overflow: visible;
}

/* new years day */
.newyear .tag {
  font-weight: bold;
  margin-top: 6px;
  color: var(--ice);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

/* small decorations */
.snowflake {
  position: absolute;
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: screen;
}

/* footer */
.legend {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 16px;
}
.legend .dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
.legend .item {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  color: var(--muted);
}

/* modal */
.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 40;
  background: linear-gradient(180deg, rgba(2, 10, 26, 0.6), rgba(2, 10, 26, 0.75));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.22s ease;
}
.modal.show {
  opacity: 1;
  pointer-events: auto;
  backdrop-filter: blur(6px);
}
.card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border-radius: 14px;
  padding: 22px;
  min-width: 260px;
  max-width: 420px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  text-align: center;
}

.close {
  transform: translateY(-6px);
  margin-top: 14px;
  padding: 8px 12px;
  border-radius: 10px;
  background: var(--glass);
  cursor: pointer;
  color: var(--ice);
}
.close:hover {
  transform: translateY(-6px);
  box-shadow: 4px 8px 40px rgba(228, 1, 1, 0.904);
}

.christmas-card {
  /*countdown*/
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  border-radius: 14px;
  padding: 22px;
  min-width: 260px;
  max-width: 420px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6);
  text-align: center;
}

/* responsive */
@media (max-width: 720px) {
  .scene {
    padding: 18px;
  }
  .day {
    min-height: 78px;
  }
  .calendar {
    grid-template-columns: repeat(3, 1fr);
  }
  .wrap {
    padding-top: 40px;
  }
  .sleigh {
    top: 55%;
    transform: translateY(-50%) scale(0.8);
  }
}
</style>
