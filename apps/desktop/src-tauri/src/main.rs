// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_shell::ShellExt;
use std::fs;
use std::path::Path;

#[tauri::command]
fn open_project(path: String) -> String {
    format!("Opened project at: {}", path)
}

#[tauri::command]
fn run_command(app: tauri::AppHandle, command: String) -> String {
    let output = app.shell().command("sh")
        .args(["-c", &command])
        .output()
        .expect("failed to execute process");
    String::from_utf8_lossy(&output.stdout).to_string()
}

#[tauri::command]
fn write_file(path: String, content: String) -> Result<(), String> {
    // Basic safety: chỉ cho phép ghi file (không được dùng path traversal)
    if path.contains("..") {
        return Err("Invalid path".into());
    }
    fs::write(Path::new(&path), content).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![open_project, run_command, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
