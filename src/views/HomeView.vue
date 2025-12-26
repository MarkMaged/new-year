<script setup>
import NewYearComponent from '@/components/NewYear/NewYearComponent.vue'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

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
</script>

<template>
  <div class="page-center" v-if="!isHaveName">
    <form @submit.prevent="onSubmit" class="name-card">
      <div class="p-fluid">
        <InputText v-model="name" placeholder="اكتب الاسم" class="mb-3" />

        <Button label="تسجيل" type="submit" class="w-full" />
      </div>
    </form>
  </div>
  <NewYearComponent v-if="isHaveName" :userName="name" />
  <Toast />
</template>
<style scoped>
.page-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.title {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}
button {
  margin-top: 1rem;
}
</style>
