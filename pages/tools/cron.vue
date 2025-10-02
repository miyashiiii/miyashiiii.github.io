<template>
  <div class="row justify-center q-pa-md">
    <div style="max-width: 640px; width: 100%">
      <h4 class="q-mt-none">Cron式パーサー</h4>
      <p class="text-grey-8">
        Cron式を入力すると、各フィールドの値と次の5回の実行予定日時を表示します。
      </p>

      <q-card class="q-pa-md">
        <q-input
          v-model="cronExpression"
          outlined
          label="Cron式を入力（例: */5 * * * *）"
          placeholder="0 9 * * 1-5"
          @update:model-value="parseCron"
        />

        <div v-if="error" class="q-mt-md">
          <q-card class="bg-red-1">
            <q-card-section>
              <div class="text-h6">エラー</div>
              <div class="q-mt-sm">{{ error }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div v-if="parsedFields" class="q-mt-md">
          <q-card class="bg-blue-1">
            <q-card-section>
              <div class="text-h6">パース結果</div>
              <q-list dense class="q-mt-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label>秒</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.second, 'second') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>分</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.minute, 'minute') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>時</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.hour, 'hour') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>日</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.dayOfMonth, 'dayOfMonth') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>月</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.month, 'month') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>曜日</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ formatField(parsedFields.dayOfWeek, 'dayOfWeek') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <div v-if="nextExecutions.length > 0" class="q-mt-md">
          <q-card class="bg-green-1">
            <q-card-section>
              <div class="text-h6">次の5回の実行予定</div>
              <q-list dense class="q-mt-sm">
                <q-item v-for="(execution, index) in nextExecutions" :key="index">
                  <q-item-section>
                    <q-item-label>{{ index + 1 }}回目</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ execution }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import parser from "cron-parser";

definePageMeta({ layout: "default" });
useHead({ title: "Cron式パーサー" });

interface CronFields {
  second: number[];
  minute: number[];
  hour: number[];
  dayOfMonth: number[];
  month: number[];
  dayOfWeek: number[];
}

const cronExpression = ref("");
const parsedFields = ref<CronFields | null>(null);
const nextExecutions = ref<string[]>([]);
const error = ref("");

const dayOfWeekNames = ["日", "月", "火", "水", "木", "金", "土"];

const formatField = (field: number[] | undefined, fieldType: string): string => {
  if (!field || field.length === 0) {
    return "*";
  }
  
  const fullRanges: Record<string, number> = {
    second: 60,
    minute: 60,
    hour: 24,
    dayOfMonth: 31,
    month: 12,
    dayOfWeek: 7,
  };
  
  if (field.length === fullRanges[fieldType]) {
    const labels: Record<string, string> = {
      second: "毎秒",
      minute: "毎分",
      hour: "毎時",
      dayOfMonth: "毎日",
      month: "毎月",
      dayOfWeek: "毎日",
    };
    return labels[fieldType] || "*";
  }
  
  if (fieldType === "dayOfWeek") {
    return field.map(day => dayOfWeekNames[day]).join(", ");
  }
  
  return field.join(", ");
};

const parseCron = () => {
  if (!cronExpression.value.trim()) {
    parsedFields.value = null;
    nextExecutions.value = [];
    error.value = "";
    return;
  }

  try {
    const interval = parser.parseExpression(cronExpression.value);
    
    parsedFields.value = interval.fields;
    
    nextExecutions.value = [];
    const tempInterval = parser.parseExpression(cronExpression.value);
    for (let i = 0; i < 5; i++) {
      const next = tempInterval.next().toDate();
      nextExecutions.value.push(
        next.toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
    
    error.value = "";
  } catch (e) {
    parsedFields.value = null;
    nextExecutions.value = [];
    error.value = e instanceof Error ? e.message : "無効なCron式です";
  }
};
</script>
