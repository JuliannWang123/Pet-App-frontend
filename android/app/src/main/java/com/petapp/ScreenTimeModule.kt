package com.petapp

import android.app.AppOpsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import java.util.Calendar
import java.util.Locale
import java.util.Date
import java.text.SimpleDateFormat

class ScreenTimeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

        private val sharedPreferences = reactApplicationContext.getSharedPreferences("ScreenTimePrefs", Context.MODE_PRIVATE)

        private fun shouldResetUsageData(): Boolean {
            val lastResetTime = sharedPreferences.getLong("lastResetTime", 0L)
            val currentTime = System.currentTimeMillis()

            val calendar = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, 0)
                set(Calendar.MINUTE, 0)
                set(Calendar.SECOND,0)
                set(Calendar.MILLISECOND,0)
            }
            val startOfDay = calendar.timeInMillis

            return lastResetTime < startOfDay
        }

        private fun resetUsageData() {
            Log.d("ScreenTimeModule", "Resetting usage data for the new day.")
            sharedPreferences.edit().putLong("lastResetTime", System.currentTimeMillis()).apply()
        }
        

        override fun getName(): String {
            return "ScreenTimeModule"
        }

        @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
        @ReactMethod
        fun isUsageAccessGranted(promise: Promise) {
            try {
                val appOpsManager =
                    reactApplicationContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
                val mode = appOpsManager.checkOpNoThrow(
                    AppOpsManager.OPSTR_GET_USAGE_STATS,
                    android.os.Process.myUid(),
                    reactApplicationContext.packageName
                )
                promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
            } catch (e: Exception) {
                promise.reject("ERROR", e.message)
            }
        }

        @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
        @ReactMethod
        fun requestUsageAccessPermission() {
            val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactApplicationContext.startActivity(intent)
        }


        @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
        @ReactMethod
        fun getLiveUsageStats(promise: Promise) {
            try {
                if (shouldResetUsageData()) {
                    resetUsageData()
                }

                val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

                val now = System.currentTimeMillis()
                val calendar = Calendar.getInstance().apply {
                    set(Calendar.HOUR_OF_DAY, 0)
                    set(Calendar.MINUTE, 0)
                    set(Calendar.SECOND, 0)
                    set(Calendar.MILLISECOND, 0)
                }
                val startOfDay = calendar.timeInMillis

                val usageStats = usageStatsManager.queryUsageStats(
                    UsageStatsManager.INTERVAL_DAILY, startOfDay, now
                )

                val usageMap = usageStats.associate { it.packageName to it.totalTimeInForeground }

                promise.resolve(Arguments.createMap().apply {
                    usageMap.forEach { (key, value) ->
                        putDouble(key, value.toDouble() / 1000) // Convert ms to seconds
                    }
                })
            } catch (e: Exception) {
                promise.reject("ERROR", e.message)
            }
        }




}
