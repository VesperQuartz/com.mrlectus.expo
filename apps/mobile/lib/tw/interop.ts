import { cssInterop } from "nativewind";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	TextInput,
	Image,
	TouchableHighlight,
} from "react-native";

cssInterop(View, { className: "style" });
cssInterop(Text, { className: "style" });
cssInterop(Pressable, { className: "style" });
cssInterop(ScrollView, {
	className: "style",
	contentContainerClassName: "contentContainerStyle",
});
cssInterop(TextInput, { className: "style" });
cssInterop(Image, { className: "style" });
cssInterop(TouchableHighlight, { className: "style" });
